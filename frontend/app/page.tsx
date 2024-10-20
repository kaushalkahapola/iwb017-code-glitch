import Header from "./components/Header";
import Hero from "./components/Hero";
import RecentTasks from "./components/RecentTasks";
import FeaturedCommunities from "./components/FeaturedCommunities";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <RecentTasks />
        <FeaturedCommunities />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
