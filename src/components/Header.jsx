import React from "react";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-20 pt-5">
        <span className="text-3xl font-semibold text-[#2b4522]">SumAI</span>
        <button className="btn" onClick={() => window.open("")} type="button">
          Github
        </button>
      </nav>

      <h1 className="text-6xl text-center text-black font-semibold">
        Summarize information with <br />{" "}
        <span className="text-[#4c8435]">OpenAI GPT-4</span>
      </h1>
      <h2 className="mt-5 text-center text-gray-700">
        Whether you are a student, a researcher, or a busy professional, this
        app is an essential tool for anyone who needs to digest a large amount
        of information quickly. The app uses advanced natural language
        processing algorithms to analyze the input data and create a summary
        that accurately reflects the most important points.
      </h2>
    </header>
  );
};

export default Header;
