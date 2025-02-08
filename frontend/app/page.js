'use client';
import React from "react";
import Link from 'next/link';
import BackgroundPaths from "@/components/ui/kokonutui/BackgroundPaths";
import { motion } from "motion/react";
import BentoGrid from '@/components/ui/kokonutui/bento-grid';
import HeroGeometric from '@/components/ui/kokonutui/HeroGeometric';
import FAQ from '@/components/ui/kokonutui/faq-02';
import Navbar from '@/components/ui/kokonutui/Navbar';
import AnimatedCard from "@/components/ui/kokonutui/AnimationCard";
import ScrollProgressBar from '@/components/ui/kokonutui/ScrollProgressBar';


function Home() {
  return (
    <main className="flex flex-col">
      {/* Remove duplicate Navbar */}
      <Navbar />
      <section>
        <section>
          <BackgroundPaths
            title="OffNet:&nbsp;Transforming&nbsp;Millon&nbsp;Lives&nbsp;"
            desc="OffNet is a resource-sharing platform designed to bring quality education to students in remote, underprivileged, and low-connectivity areas. By enabling offline access to educational content, OffNet bridges the digital divide, allowing tutors to share lessons, videos, and study materials with students—without requiring internet access."
          />
        </section>
        
        <div className="bg-gray-100 p-0 m-0">
          {/* Add a link to dashboard within or near AnimatedCard */}
          <div className="relative">
            <AnimatedCard />
            
          </div>
        </div>
        
        <HeroGeometric
          badge="OffNet"
          title1="One step solution for all your needs."
        />
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-8">
        <BentoGrid />
      </section>
      
      <section className="bg-black">
        <FAQ />
      </section>
    </main>
  );
}

export default Home;