import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ToolsSection from '@/components/ToolsSection'
import MasterySection from '@/components/MasterySection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      
      <main className="relative flex-1 flex flex-col">
        <HeroSection />
        <ToolsSection />
        <MasterySection />
        <Footer />
      </main>
    </div>
  )
}
