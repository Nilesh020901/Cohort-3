import { useState } from "react";

const faqs = [
    {
      question: "React kya hai?",
      answer: "React ek JavaScript library hai jo UI banane ke liye use hoti hai."
    },
    {
      question: "React mein component kya hota hai?",
      answer: "Component ek independent piece hota hai UI ka jo reuse kiya ja sakta hai."
    },
    {
      question: "State aur Props mein kya farak hai?",
      answer: "State internal hoti hai component ke liye, props external data hota hai."
    }
];

function FaqApp() {
      const [activeIdx, setActiveIdx] = useState(null);

      const toggleAnswer = (idx) => {
        setActiveIdx(prevIdx => (prevIdx === idx ? null : idx));
      };
    return (
        <div>
            <h2>FAQs</h2>
            {faqs.map((faq, idx) => (
                <FaqItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={activeIdx === idx}
                    onClick={() => toggleAnswer(idx)}
                />
            ))}
        </div>
    );
}

export default FaqApp;