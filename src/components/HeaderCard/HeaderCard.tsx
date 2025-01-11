import { useTranslation } from "react-i18next";

const HeaderCard = ({image, title,desc}:any) => {
    const { t } = useTranslation();
    return (<footer
      className="relative overflow-hidden h-[200px] w-full bg-no-repeat bg-center bg-cover text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",         
        backgroundPosition: "center",    
        backgroundRepeat: "no-repeat",   
      }}
    >
          <div className="bg-[#0c2340]/80 w-full h-full mx-auto  py-12">
            <div className="mb-6 w-[50vw] mx-auto text-center">
              <h2 className="text-2xl font-bold">{t(title)}</h2>
              <p className="text-sm mt-2">
                {t(desc)}
              </p>
            </div>
            </div>
        </footer>)
}


export default HeaderCard;