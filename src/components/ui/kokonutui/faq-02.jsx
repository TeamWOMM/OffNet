import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border-[0.5px] border-gray-800/50",
        "transition-all duration-200 ease-in-out",
        isOpen
          ? "bg-linear-to-br from-black via-gray-900/50 to-black"
          : "hover:bg-gray-900/50",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4"
      >
        <h3
          className={cn(
            "text-base font-medium transition-colors duration-200 text-left",
            "text-gray-300",
            isOpen && "text-white",
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "p-0.5 rounded-full shrink-0",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-gray-500",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm text-gray-400 leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "What is OffNet?",
      answer:
        "OffNet is a platform that provides education to students in remote areas without internet access through offline resource sharing and local networks.",
    },
    {
      question: "How does OffNet work?",
      answer:
        "OffNet uses offline learning hubs, mesh networking, and offline-first apps to deliver educational content through Wi-Fi.",
    },
    {
      question: "Who can benefit from OffNet?",
      answer:
        "Students in rural and underserved communities, schools, NGOs, and governments looking to provide offline education solutions.",
    },
    {
      question: "What type of educational content is available?",
      answer:
        "Students can connect to local OffNet hubs via Wi-Fi, use offline apps, scan QR codes, or receive content through USBs and SD cards.",
    },
    {
        question: "Does OffNet require the internet at any stage?",
        answer: 
        "No, OffNet works entirely offline but can update content when an internet connection is available.",
    },
    {
        question: "How can I get in touch with the OffNet team?",
        answer: "You can contact us via email, social media, or join our community forum to collaborate and get support.",
    },
  ];

  return (
    <section className="py-16 w-full bg-linear-to-b from-transparent via-gray-900/50 to-transparent">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-semibold mb-3 bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400">Everything you need to know about our platform</p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn("max-w-md mx-auto mt-12 p-6 rounded-lg text-center")}
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <p className="text-sm font-medium text-white mb-1">Still have questions?</p>
          <p className="text-xs text-gray-400 mb-4">We're here to help you</p>
          <button
            type="button"
            className={cn(
              "px-4 py-2 text-sm rounded-md",
              "bg-white text-gray-900",
              "hover:bg-gray-100",
              "transition-colors duration-200",
              "font-medium",
            )}
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;