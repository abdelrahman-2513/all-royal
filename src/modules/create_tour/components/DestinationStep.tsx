import React, { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Destination {
  id: string;
  name: string;
  imageUrl: string;
}

interface DestinationStepProps {
  onSubmit: (destinations: string[]) => void;
}

export const DestinationStep: React.FC<DestinationStepProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();

  const DESTINATIONS: Destination[] = [
    {
      id: "egypt",
      name: t("Egypt"),
      imageUrl:
        "https://media.istockphoto.com/id/178375366/photo/full-sphynx-profile-pyramid-giza-egypt.jpg?s=612x612&w=0&k=20&c=qtwWxnlVtMLTveuGchQSEyHgU2XNgMnZfz6egnMg0sI=",
    },
    {
      id: "jordan",
      name: t("Jordan"),
      imageUrl:
        "https://blog.sawwahtravel.com/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-20-at-3.01.25-PM.jpeg",
    },
    {
      id: "dubai",
      name: t("Dubai"),
      imageUrl:
        "https://travelbird-images.imgix.net/f2/0b/f20bce73731062f021a0c62b7353fa76?auto=compress%2Cformat&crop=faces%2Cedges%2Ccenter&fit=crop&h=1144&upscale=true&w=828",
    },
    {
      id: "saudi-arabia",
      name: t("Saudi Arabia"),
      imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f2/40/d0/caption.jpg?w=1400&h=1400&s=1&cx=2374&cy=651&chk=v1_7198ebef93f0bbd53135",
    },
  ];

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );

  const toggleDestination = (destinationId: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Selected Destinations:", selectedDestinations);
    e.preventDefault();
    if (selectedDestinations.length > 0) {
      onSubmit(selectedDestinations);
    }
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-blue-900 mb-6 md:mb-8">
        {t("Choose Your Destination")}?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {DESTINATIONS.map((destination) => (
            <div
              key={destination.id}
              onClick={() => toggleDestination(destination.id)}
              className={`relative cursor-pointer group touch-manipulation p-2 ${
                selectedDestinations.includes(destination.id)
                  ? "bg-gray/100 border-1 rounded-lg border-blue-900"
                  : "bg-white border-1 rounded-lg border-blue-900"
              }`}
            >
              <div className="flex flex-col items-center">
              <span className="text-l md:text-sm font-medium text-[#044d88] font-semibold text-center">
                  {destination.name}
                </span>
                <div className="relative w-full rounded-lg h-[150px] overflow-hidden mb-2 md:mb-3">
                  <div className="absolute inset-0 transition-transform duration-300 transform group-hover:-translate-y-1 md:group-hover:-translate-y-2">
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedDestinations.includes(destination.id) && (
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 rounded-lg p-0.5 md:p-1">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6  md:mt-8">
          <button
            type="submit"
            disabled={selectedDestinations.length === 0}
            className={`
              w-full sm:w-auto px-8 py-2 rounded-md text-white font-medium text-sm md:text-base
              ${
                selectedDestinations.length === 0
                  ? "bg-[#044d88] cursor-not-allowed"
                  : "bg-[#044d88] hover:bg-blue-800 active:bg-blue-950 transition-colors duration-300"
              }
            `}
          >
            {t("Next")}
          </button>
        </div>
      </form>
    </div>
  );
};
