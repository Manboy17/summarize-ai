import React, { useEffect, useState } from "react";
import copy from "../assets/copy.svg";
import link from "../assets/link.svg";
import loader from "../assets/loader.svg";
import tick from "../assets/tick.svg";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col gap-3 w-full">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={link}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5 bg-transparent"
          />
          <input
            type="url"
            className="url_input"
            required
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button type="submit" className="absolute right-0 mr-3">
            Next
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, i) => (
            <div className="link_card" key={i} onClick={() => setArticle(item)}>
              <div className="copy_btn">
                <img
                  onClick={() => handleCopy(item.url)}
                  src={copied === item.url ? tick : copy}
                  alt="copy-icon"
                  className="object-contain bg-transparent"
                />
              </div>
              <p className="flex-1 bg-transparent text-blue-700 text-sm text-medium truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader-icon" className="w-10 h-10" />
        ) : error ? (
          <p className="font-inter font-bold text-black">
            Something went wrong... <br />{" "}
            <span className="text-gray-700 font-normal">
              {error?.data?.error}
            </span>{" "}
          </p>
        ) : (
          article.summary && (
            <div className="text-2xl text-bold text-gray-600">
              Article <span className="text-[#2b4522] font-bold">Summary</span>
              <div className="box mt-4">
                <p className="font-medium font-inter text-sm text-gray-700 bg-transparent">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
