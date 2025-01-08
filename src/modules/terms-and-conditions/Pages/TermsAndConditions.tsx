const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Terms and Conditions
        </h2>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Book Your Dream Tour with Ease
          </h3>
          <p className="text-gray-700">
            Hello! We're delighted to help you book your dream tour with All
            Royal Travel. Let us know your preferences, and we’ll handle the
            rest.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Personalized Itinerary for You
          </h3>
          <p className="text-gray-700">
            Once you reach out, one of our friendly representatives will contact
            you. Together, we’ll create a custom itinerary tailored to your
            interests. Once you’re satisfied, your journey is confirmed!
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Booking Policy
          </h3>
          <p className="text-gray-700">
            Start your tour by paying as little as 25% of the total cost. During
            festive periods such as Christmas, New Year, and Easter, we require
            a 50% down payment. The remaining balance can be settled two days
            before your arrival or in cash upon arrival.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Credit Card Payments
          </h3>
          <p className="text-gray-700">
            If you choose to pay by credit card, we require a signed
            authorization letter. This letter should match the signature on your
            card and passport to authorize the payment.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Fair Cancellation Fees (Excluding Peak Periods)
          </h3>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              From booking date until 61 days before arrival: 15% of the tour
              price
            </li>
            <li>60-31 days before arrival: 35% of the tour price</li>
            <li>30-15 days before arrival: 50% of the tour price</li>
            <li>14-1 days before arrival: 100% of the tour price</li>
          </ul>
          <p className="mt-4 text-gray-700">
            For Peak Periods (Christmas, New Year, Easter):
          </p>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              From booking date until 61 days before arrival: 25% of the tour
              price
            </li>
            <li>60-31 days before arrival: 50% of the tour price</li>
            <li>30-15 days before arrival: 75% of the tour price</li>
            <li>14-1 days before arrival: 100% of the tour price</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Additionally, airlines may impose their own fees, which are based on
            their terms, along with a 5% bank fee on refunds. Group tours or
            unique itineraries may have distinct cancellation policies.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Refunds</h3>
          <p className="text-gray-700">
            Refunds will be processed using the original payment method. No
            refunds are provided for no-shows. A 5% bank fee applies to all
            refunds.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Force Majeure
          </h3>
          <p className="text-gray-700">
            In cases where travel warnings are issued by government authorities
            or airlines, All Royal Travel offers a flexible cancellation policy.
            We provide a full refund or, in certain cases, a future travel
            credit or voucher valid for destinations we operate in. This policy
            excludes flight cancellation/change fees and applicable bank
            charges.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Accommodation
          </h3>
          <p className="text-gray-700">
            Prices are based on double occupancy. Single rooms are available at
            an additional cost. Prices may change without prior notice.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Flights</h3>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Domestic Flights:</strong> Prices quoted are averages, and
              flight times are approximate. Changes may affect the price.
            </li>
            <li>
              <strong>International Flights:</strong> We offer competitive rates
              from your home country to your destination.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Black Friday Offers
          </h3>
          <p className="text-gray-700">
            Black Friday deals are available through November 30 on our website.
            These deals are valid only for new inquiries made during the sale.
            Exclusions may apply to certain packages.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Responsibility
          </h3>
          <p className="text-gray-700">
            All Royal Travel is not liable for situations beyond our control,
            such as weather, political events, or changes made by hotels or
            airlines. Any additional costs resulting from these issues are the
            responsibility of the traveler.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Special Requests Policy
          </h3>
          <p className="text-gray-700">
            If you have any special requests, please notify us when booking. We
            will make every effort to accommodate them, but they cannot be
            guaranteed.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Children Policy (Children Sharing Parents’ Room)
          </h3>

          {/* Policy 1 */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Policy 1 (for packages, Nile cruises, and hotels):
            </h4>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>
                <strong>Under 2 years:</strong> Free
              </li>
              <li>
                <strong>Under 6 years:</strong> 25% of the adult price
              </li>
              <li>
                <strong>Under 12 years:</strong> 50% of the adult price
              </li>
              <li>
                <strong>12 years and older:</strong> Full adult price
              </li>
              <li>An additional supplement applies for flights.</li>
            </ul>
          </div>

          {/* Policy 2 */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              Policy 2 (for sightseeing tours & shore excursions):
            </h4>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>
                <strong>Under 6 years:</strong> Free
              </li>
              <li>
                <strong>Under 12 years:</strong> 50% of the adult price
              </li>
              <li>
                <strong>12 years and older:</strong> Full adult price
              </li>
              <li>Supplement applies for domestic flights or ferry boats.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Terms of Photo Use
          </h3>
          <p className="text-gray-700">
            We may feature your photos on our website or social media to inspire
            other travelers. Thank you for sharing your travel moments!
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tipping</h3>
          <p className="text-gray-700">
            Tipping is appreciated for excellent service but is not mandatory.
            Your generosity will be valued by our staff.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Complaints
          </h3>
          <p className="text-gray-700">
            If you have any complaints, please inform us immediately to resolve
            the issue promptly. If you remain dissatisfied, you may contact our
            Customer Care Manager during your tour or reach out to us after your
            return.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            General Terms of Use
          </h3>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              Minors under 18 cannot register or transact on this website.
            </li>
            <li>
              Payment details provided on our website are securely processed.
            </li>
            <li>Retain a copy of your transaction record and our policies.</li>
            <li>We accept Visa and MasterCard in AED, USD, EUR, and GBP.</li>
          </ul>
        </section>

        <section className="text-center">
          <p className="text-gray-700">
            By booking with All Royal Travel, you agree to these terms and
            conditions. Safe travels and enjoy your experience with us!
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
