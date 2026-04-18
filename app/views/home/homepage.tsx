import React from "react";
import "./homepage.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import type { Banner, Service } from "~/types";
import { mockPromo, mockService } from "~/utils/mock";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [availableServices, setAvailableServices] = React.useState<Service[]>(
    [],
  );
  const [activePromos, setActivePromos] = React.useState<Banner[]>([]);

  const dispatch = useAppDispatch();
  const { banners, services } = useAppSelector((state) => state.information);

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch({
      type: "FETCH_BANNERS",
    });
    dispatch({
      type: "FETCH_SERVICES",
    });
    dispatch({
      type: "FETCH_PROFILE",
    });
  }, [dispatch]);

  React.useEffect(() => {
    setActivePromos(banners);
    setAvailableServices(services);
  }, [banners, services]);

  function handleServiceClick(service: Service) {
    console.log("HEY");
    navigate(`/transaction`);
    dispatch({
      type: "SET_ACTIVE_SERVICE",
      payload: {
        service,
      },
    });
  }

  return (
    <Dashboard selectedMenu="none">
      {/* Services Section */}
      <section className="services-section">
        <div className="services-grid">
          {availableServices.length > 0
            ? availableServices.map((service) => (
                <button
                  key={service.service_code}
                  className="service-button"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="service-icon">
                    <img
                      src={service.service_icon}
                      alt={service.service_name}
                    />
                  </div>
                  <span className="service-label">{service.service_name}</span>
                </button>
              ))
            : mockService.map((service) => (
                <button key={service.service_code} className="service-button">
                  <div className="service-icon">
                    <div className="flex items-center justify-center w-full h-48 bg-neutral-quaternary rounded-base sm:w-96">
                      <svg
                        className="w-11 h-11 text-fg-disabled"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center w-full">
                    <div className="h-2.5 bg-neutral-quaternary rounded-full w-32"></div>
                  </div>{" "}
                </button>
              ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section">
        <h3 className="promo-title">Temukan promo menarik</h3>
        <div className="promo-carousel">
          {activePromos.length > 0
            ? activePromos.map((promo, i) => (
                <div key={i} className="promo-card">
                  <img src={promo.banner_image} alt={promo.banner_name} />
                </div>
              ))
            : mockPromo.map((_, i) => (
                <div key={i} className="promo-card">
                  <div className="flex items-center justify-center w-full h-48 bg-neutral-quaternary rounded-base sm:w-96">
                    <svg
                      className="w-11 h-11 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </Dashboard>
  );
};

export default HomePage;
