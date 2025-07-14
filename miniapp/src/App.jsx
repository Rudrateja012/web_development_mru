import './App.css';
import logo from './logoq.svg';
import StudentRankingList from './StudentRankingList';

const menuData = {
  Starters: [
    { name: "Samosa", price: "₹60", img: "data:image/jpeg;base64,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" },
    { name: "Paneer Tikka", price: "₹180", img: "https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka.jpg" },
    { name: "Dahi Puri", price: "₹90", img: "https://i0.wp.com/www.seema.com/wp-content/uploads/2022/01/shutterstock_1162358743-scaled.jpg?fit=2560%2C1709&ssl=1" },
    { name: "Aloo Tikki", price: "₹70", img: "https://tse4.mm.bing.net/th/id/OIP.kE_TObCdWeixlzh7iXpC9gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }
  ],
  "Main Course": [
    { name: "Butter Chicken", price: "₹350", img: "https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg" },
    { name: "Paneer Butter Masala", price: "₹280", img: "data:image/jpeg;base64,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" },
    { name: "Biryani", price: "₹250", img: "https://th.bing.com/th/id/OSK.9f00961cc71a1d8b025afbf4fd567139?w=226&h=226&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1" },
    { name: "Masala Dosa", price: "₹120", img: "https://tse2.mm.bing.net/th/id/OIP.6Nx_C1m4YCujBiHe48YpHAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" }
  ],
  Desserts: [
    { name: "Gulab Jamun", price: "₹80", img: "https://tse2.mm.bing.net/th/id/OIP.TR6gVZG-S4YxWTyGXxAHiwHaFk?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Rasmalai", price: "₹100", img: "https://tse2.mm.bing.net/th/id/OIP.5df8Bbypsd70KRB6Urq4vAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Jalebi", price: "₹60", img: "https://tse4.mm.bing.net/th/id/OIP.r3XUeT9DYpmS_O9p7YzHCgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Kheer", price: "₹90", img: "https://tse3.mm.bing.net/th/id/OIP.oGgMDTfqImnyAvaVN1arBgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" }
  ]
};


const testimonials = [
  {
    name: "Priya S.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "An unforgettable dining experience! The food and ambiance were perfect."
  },
  {
    name: "Arjun M.",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    review: "Exceptional service and delicious dishes. Highly recommended!"
  },
  {
    name: "Sneha R.",
    photo: "https://randomuser.me/api/portraits/women/47.jpg",
    review: "Restoria is my go-to for special occasions. The chef’s creations are divine."
  }
];

const chefs = [
  {
    name: "Chef Rohan",
    photo: "https://tse3.mm.bing.net/th/id/OIP.P1-I-UNzkWFJvi_k-ES5BQHaJn?rs=1&pid=ImgDetMain&o=7&rm=3",
    bio: "Executive Chef, 20+ years of culinary excellence."
  },
  {
    name: "Chef Meera",
    photo: "https://th.bing.com/th/id/OIP.mLPuxXMvX9Vs6jSOdlidpgHaH2?w=142&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    bio: "Pastry Chef, renowned for creative desserts."
  }
];

const Navbar = () => (
  <nav className="navbar">
    
    <a href="#hero">Home</a>
    <a href="#about">About</a>
    <a href="#menu">Menu</a>
    <a href="#reservation">Reservation</a>
    <a href="#testimonials">Reviews</a>
    <a href="#chefs">Chefs</a>
    <a href="#footer">Contact</a>
  </nav>
);

const HeroSection = () => (
  <section id="hero" className="hero-section">
    <div>
      <h1 className="restaurant-name">Rudra</h1>
      <p className="tagline">A Fine Dining Experience</p>
      <p className="open-hours">Open: 12pm - 11pm</p>
      <p className="address">123 Gourmet Lane, Mumbai</p>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="about-section">
    <div className="about-content">
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          At Restoria, we blend culinary artistry with a passion for hospitality. Our chefs craft exquisite dishes using the finest ingredients, creating a memorable fine dining experience in a warm, elegant setting.
        </p>
      </div>
      <div className="about-image">
        <img src={logo} alt="Chef or Interior" />
      </div>
    </div>
  </section>
);

const MenuSection = () => (
  <section id="menu" className="menu-section">
    <h2>Menu</h2>
    {Object.entries(menuData).map(([category, items]) => (
      <div key={category} className="menu-category">
        <h3>{category}</h3>
        <div className="menu-items">
          {items.map(item => (
            <div className="menu-item" key={item.name}>
              <img src={item.img} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

const ReservationForm = () => (
  <section id="reservation" className="reservation-section">
    <h2>Reserve Your Table</h2>
    <form className="reservation-form">
      <input type="text" placeholder="Name" required />
      <input type="tel" placeholder="Phone" required />
      <input type="date" required />
      <input type="time" required />
      <button type="submit" className="primary-btn">Reserve Now</button>
    </form>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="testimonials-section">
    <h2>What Our Guests Say</h2>
    <div className="testimonials-grid">
      {testimonials.map(t => (
        <div className="testimonial-card" key={t.name}>
          <img src={t.photo} alt={t.name} className="testimonial-photo" />
          <p>{t.review}</p>
          <span className="reviewer">— {t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

const ChefTeamSection = () => (
  <section id="chefs" className="chef-section">
    <h2>Meet Our Chefs</h2>
    <div className="chef-grid">
      {chefs.map(chef => (
        <div className="chef-card" key={chef.name}>
          <img src={chef.photo} alt={chef.name} />
          <h3>{chef.name}</h3>
          <p>{chef.bio}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer id="footer" className="footer-section">
    <div className="footer-content">
      <div className="footer-info">
        <p>Restoria, 123 Gourmet Lane, Mumbai</p>
        <p>Phone: +91 98765 43210 | Email: info@restoria.com</p>
      </div>
      <div className="footer-social">
        <a href="#" aria-label="Facebook">FB</a>
        <a href="#" aria-label="Instagram">IG</a>
        <a href="#" aria-label="Google">G</a>
      </div>
    </div>
    <div className="footer-copy">© 2025 Restoria. All rights reserved.</div>
  </footer>
);

function App() {
  return (
    <div className="restaurant-app">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ReservationForm />
      <TestimonialsSection />
      <ChefTeamSection />
      <Footer />
      <StudentRankingList />
    </div>
  );
}

export default App;
