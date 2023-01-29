import React from "react";
import "./testimonialCard.css";
import { AiFillStar } from "react-icons/ai";
import author1 from "../../../assets/authors/SteveHenry.jpg";
import author2 from "../../../assets/authors/Jubaedah.jpg";
import author3 from "../../../assets/authors/WillyWonka.jpg";
import author4 from "../../../assets/authors/RudyHerlambang.jpg";

const TestimonialsCard: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      rating: 4,
      description:
        "Shoping book in Clevr. is very easy. Quick delivery and fast respon. They services is awesome!",
      author: "Steve Henry",
      occupation: "Book Lovers",
    },
    {
      id: 2,
      rating: 3,
      description:
        "Clevr went above and beyond - great and friendly customer service and prompt delivery of my book. I highly recommend them. Many thanks!",
      author: "Jubaedah",
      occupation: "CEO of Jubaedah Store",
    },
    {
      id: 3,
      rating: 5,
      description:
        "Excellent service. The books were wrapped securely and arrived in pristine condition. I sent an email after to books arrived to ask about the author, and I received a prompt reply",
      author: "Willy Wonca",
      occupation: "Sales Marketing",
    },
    {
      id: 4,
      rating: 4,
      description:
        "This item was not available on Amajon, somehow, I located it on the publishers website.. Awesome...!!!",
      author: "Rudy Herlambang",
      occupation: "Book Lovers",
    },
  ];
  return (
    <div className="news-container">
      {testimonials.map((item: any) => (
        <div key={item.id} className="testimonials-card">
          <div className="testimonials-start-container">
            {Array.from({ length: item.rating }, (_, i) => (
              <AiFillStar key={i} size={25} color="#FF7A00" />
            ))}
            {Array.from({ length: 5 - item.rating }, (_, i) => (
              <AiFillStar key={i} size={25} color="#E0E0E0" />
            ))}
          </div>
          <p style={{ marginTop: 20 }}>{item.description}</p>
          <div className="testimonials-start-container">
            <div>
              <h5>{item.author}</h5>
              <p style={{ marginTop: -5 }}>{item.occupation}</p>
            </div>
            {item.id === 1 && (
              <img className="testimonials-image" src={author1} alt="" />
            )}
            {item.id === 2 && (
              <img className="testimonials-image" src={author2} alt="" />
            )}
            {item.id === 3 && (
              <img className="testimonials-image" src={author3} alt="" />
            )}
            {item.id === 4 && (
              <img className="testimonials-image" src={author4} alt="" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsCard;
