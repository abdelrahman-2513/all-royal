import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { Session } from "@supabase/supabase-js";
  import { supabase } from "@/api/supabase";
  
  interface AuthContextType {
    session: Session | null;
    getSession: () => Promise<any>;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
  
    useEffect(() => {
      supabase.auth.getSession().then((res) => {
        setSession(res.data.session);
      });
  
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
        }
      );
  
      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, []);
  
    const getSession = async () => {
      return await supabase.auth.getSession(); 
    };
  
    const signIn = async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    };
  
    const signUp = async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    };
  
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    };
  
    return (
      <AuthContext.Provider value={{ session, getSession, signIn, signUp, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  };
  export default AuthProvider;
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  