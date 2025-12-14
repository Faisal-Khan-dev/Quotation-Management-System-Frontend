import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import ProfileSidebar from '../../../components/common/ProfileSidebar';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the Quotation System App?",
      answer: "It's a platform where users can request quotations for products or services, and vendors can send personalized offers in response."
    },
    {
      question: "How can I request a quotation?",
      answer: "Simply navigate to the request section, fill in the details about the product or service you need, and submit your request. Vendors will then send you their quotations."
    },
    {
      question: "Can I compare quotations from multiple vendors?",
      answer: "Yes, you can receive and compare multiple quotations side by side to choose the best offer that suits your requirements and budget."
    },
    {
      question: "How long does it take to receive a quotation?",
      answer: "The response time varies by vendor, but typically you can expect to receive quotations within 24-48 hours of submitting your request."
    },
    {
      question: "Can I approve or reject a quotation?",
      answer: "Yes, you have full control to review, approve, or reject any quotation you receive. You can also communicate with vendors for clarifications."
    },
    {
      question: "Do I need to register to use the app?",
      answer: "Yes, registration is required to request quotations and manage your requests. It's a quick process that helps us provide you with a personalized experience."
    },
    {
      question: "Can I view my previous quotations?",
      answer: "Yes, all your quotation history is saved in your account. You can access and review previous quotations anytime from your dashboard."
    },
    {
      question: "Is there any fee for requesting quotations?",
      answer: "No, requesting quotations is completely free for users. You only pay when you decide to proceed with a vendor's offer."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (

    <div className="flex">
  <ProfileSidebar />
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-[26px]">
          FAQS
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-[20px] py-[12px] text-left hover:bg-gray-50 transition-all duration-200 group"
              >
                <span className="text-base sm:text-lg font-medium text-gray-900 pr-8 group-hover:text-gray-700">
                  {faq.question}
                </span>

                <span className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
</div>

  );
};

export default FAQs;
  