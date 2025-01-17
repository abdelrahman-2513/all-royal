import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CustomerForm from '@/modules/nile-cruise/components/OneCruise/CustomerForm';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FormSubmitSuccess from '../components/FormSubmitted';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  
  const BasicBreadcrumbs = ({id}: any)=> {
  
    console.log({id});
    return (
      <div role="presentation"  className="mb-3 px-5 py-2"  onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link underline="hover" color="#06284b" href="/en/nile-cruises">
            Nile Crusies
          </Link>
          <Link
            underline="hover"
            color="#0071cc"
            href={`/en/nile-cruises/${id}`}
          >
           <Typography sx={{ color: '#0071cc' }}>{`Cruise # ${id}`}</Typography> 
          </Link>
         
        </Breadcrumbs>
      </div>
    );
  }
const BookForm = ({pack,Children,plans,lowerPrices}:any) => {

    const [submitted, setSubmitted] = useState(false);

    const { t } = useTranslation();
    return (
        <div className="w-full bg-[#dfefff] mx-auto">
            <div className="w-[90vw] mx-auto">
                {!submitted?<>
            <div className="md:w-2/3 mx-auto mb-6 space-y-4 max-w-full text-center">
      {pack && pack.NileCruisesName && (
          <h1 className="text-3xl font-bold text-blue-900 capitalize">
          {pack.NileCruisesName}
        </h1>
      )}
      {pack && pack.package_name && (
          <h1 className="text-3xl font-bold text-blue-900 capitalize">
          {pack.package_name}
        </h1>
      )}
      <div className="mt-6">
        
        <div className="flex md:flex-row flex-row justify-between items-center mt-4 gap-4">
          <div className="text-center mt-2">
            <div className="text-3xl text-gray-700 mb-2">⌛</div>
            {pack && pack.days && (
              <p className="text-sm font-medium my-1 capitalize">
                {pack.days +
                  ` ${t("Days")} / ` +
                  pack.nights +
                  ` ${t("Nights")}`}
                {pack.days2 && <><br />
                {t("OR")}
                </>}
                <br />
                {pack.days2 && (<>{pack.days2 +
                  ` ${t("Days")} / ` +
                  pack.nights2 +
                  ` ${t("Nights")}`}</>)}
              </p>
            )}
          </div>
          {pack.country && pack.cities && pack.cities.length > 0 && (
            <div className="text-center">
              <div className="text-3xl text-gray-700 mb-2">🌍</div>
              <p className="text-sm font-medium my-1">1 {` ${t("Country")}`}</p>
              <p className="text-gray-500 text-sm my-1">
                {pack.cities.length + ` ${t("Cities")}`}
              </p>
            </div>
          )}
          {pack.tourType && (
            <div className="text-center mb-3">
              <div className="text-3xl text-gray-700 mb-2">👥</div>
              <p className="max-w-full md:max-w-[200px] text-sm font-medium my-1">
                {/* Small Group Tour */}
                {pack.tourType}
              </p>
              {/* <p className="text-gray-500 text-sm my-1">12 Persons</p> */}
            </div>
          )}
          <div className="text-center mb-3">
            <div className="text-3xl text-gray-700 mb-2">📅</div>
            <p className="text-sm font-medium my-1">
              {/* Every Thursday from Luxor */}
              {pack.availability !== "" ? pack.availability : t("Everyday")}
            </p>
          </div>
        </div>
      </div>
      </div>
            <Children setSubmitted={setSubmitted} pack={pack} plans={plans} lowerPrices={lowerPrices} selectedId={pack.id}/>
            {/* <CustomerForm /> */}
            </>:<FormSubmitSuccess/>}

        </div>

        </div>
    )
}


export default BookForm;