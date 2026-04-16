import React from "react";
import "./dashboard.css";
import Dashboard from "~/components/dashboard/dashboard";

interface ServiceButton {
  id: string;
  label: string;
  icon: string;
}

interface PromoCard {
  id: string;
  image: string;
}

const HomePage = () => {
  const serviceButtons: ServiceButton[] = [
    { id: "pbb", label: "PBB", icon: "" },
    { id: "listrik", label: "Listrik", icon: "" },
    { id: "pulsa", label: "Pulsa", icon: "" },
    { id: "pdam", label: "PDAM", icon: "" },
    { id: "pgn", label: "PGN", icon: "" },
    { id: "tv", label: "TV Langganan", icon: "" },
    { id: "musik", label: "Musik", icon: "" },
    { id: "voucher-game", label: "Voucher Game", icon: "" },
    { id: "voucher-makanan", label: "Voucher Makanan", icon: "" },
    { id: "kurban", label: "Kurban", icon: "" },
    { id: "zakat", label: "Zakat", icon: "" },
    { id: "paket-data", label: "Paket Data", icon: "" },
  ];

  const promoCards: PromoCard[] = [
    { id: "promo-1", image: "" },
    { id: "promo-2", image: "" },
    { id: "promo-3", image: "" },
    { id: "promo-4", image: "" },
    { id: "promo-5", image: "" },
  ];

  return (
    <Dashboard user={null} selectedMenu="none">
      {/* Services Section */}
      <section className="services-section">
        <div className="services-grid">
          {serviceButtons.map((service) => (
            <button key={service.id} className="service-button">
              <div className="service-icon">
                <img src={service.icon} alt={service.label} />
              </div>
              <span className="service-label">{service.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section">
        <h3 className="promo-title">Temukan promo menarik</h3>
        <div className="promo-carousel">
          {promoCards.map((promo) => (
            <div key={promo.id} className="promo-card">
              <img src={promo.image} alt="Promo" />
            </div>
          ))}
        </div>
      </section>
    </Dashboard>
  );
};

export default HomePage;
