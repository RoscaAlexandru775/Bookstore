import React from "react";
import author from "../../../assets/authors/JamesWong.jpg";
import news1 from "../../../assets/news/news1.jpg";
import news2 from "../../../assets/news/news2.jpg";
import news3 from "../../../assets/news/news3.jpg";
import news4 from "../../../assets/news/news4.jpg";
import "./newsCard.css";

const newsCard: React.FC = () => {
  const news = [
    {
      id: 1,
      title: "Why reading is important for our children?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "James Wong",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Benefits of reading: Smart, Diligent, Happy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "James Wong",
      date: "5 August 2020",
    },
    {
      id: 3,
      title: "What books you should read in 2020?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "James Wong",
      date: "3 August 2020",
    },
    {
      id: 4,
      title: "10 Things you must know to improve your reading skills",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "James Wong",
      date: "1 August 2020",
    },
  ];
  return (
    <div className="news-container">
      {news.map((item: any) => (
        <div key={item.id} className="news-card">
          {item.id === 1 && <img className="news-image" src={news1} alt="" />}
          {item.id === 2 && <img className="news-image" src={news2} alt="" />}
          {item.id === 3 && <img className="news-image" src={news3} alt="" />}
          {item.id === 4 && <img className="news-image" src={news4} alt="" />}
          <h4 className="news-title">{item.title}</h4>
          <p>{item.description}</p>
          <div className="news-author">
            <img className="news-author-image" src={author} alt="book-image" />
            <div className="news-author-info">
              <h6 className="news-author-name">{item.author}</h6>
              <p className="news-date">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default newsCard;
