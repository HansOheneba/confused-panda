import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  TrendingDown,
  Settings,
  Bed,
  Bath,
  Square,
  Heart,
  MapPin,
  Play,
  MessageCircle,
  User,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
                </div>
                <span className="text-xl font-bold">Airban</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Link href="#" className="hover:text-blue-200">
                  Home
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  Our Doors
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  Properties
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  Company
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  About
                </Link>
              </nav>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Buy, rent, or sell your property easily
              </h1>
              <p className="text-blue-100 mb-8 text-lg">
                A great platform to buy, sell, or even rent your properties
                without any commissions.
              </p>

              {/* Search Form */}
              <div className="bg-white rounded-lg p-6 text-gray-900">
                <div className="flex space-x-4 mb-4">
                  <Button variant="default" className="bg-blue-600 text-white">
                    Rent
                  </Button>
                  <Button variant="ghost" className="text-gray-600">
                    Buy
                  </Button>
                  <Button variant="ghost" className="text-gray-600">
                    Sell
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Input placeholder="Barcelona, Spain" className="w-full" />
                  </div>
                  <div>
                    <Input
                      placeholder="Select Move-in Date"
                      className="w-full"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Properties
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Modern house"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-blue-600 text-white h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    The new way to find your new home
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Find your dream place to live in with more than 10k+
                    properties listed.
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600"
                  >
                    Browse Properties
                  </Button>
                  <div className="mt-8">
                    <Image
                      src="/placeholder.svg?height=120&width=200"
                      alt="House illustration"
                      width={200}
                      height={120}
                      className="opacity-80"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold mb-2">Property Insurance</h4>
                  <p className="text-gray-600 text-sm">
                    We offer our customer property protection of liability
                    coverage and insurance for their better life.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <TrendingDown className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold mb-2">Lowest Commission</h4>
                  <p className="text-gray-600 text-sm">
                    You no longer have to negotiate commissions and haggle with
                    other agents it only cost 2%!
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <DollarSign className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold mb-2">Best Price</h4>
                  <p className="text-gray-600 text-sm">
                    Not sure what you should be charging for your property? No
                    need to worry, let us do the numbers for you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Settings className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold mb-2">Overall Control</h4>
                  <p className="text-gray-600 text-sm">
                    Get a virtual tour, and schedule visits before you rent or
                    buy any properties. You get overall control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Based on your location</h2>
            <p className="text-gray-600">
              Some of our picked properties near your location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$2,095",
                period: "/month",
                title: "Palm Harbor",
                address: "2699 Green Valley, Highland Lake, FL",
                beds: 3,
                baths: 2,
                sqft: "5x7",
              },
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$2,700",
                period: "/month",
                title: "Beverly Springfield",
                address: "2821 Lake Sevilla, Palm Harbor, TX",
                beds: 4,
                baths: 2,
                sqft: "6x7.5",
              },
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$4,550",
                period: "/month",
                title: "Faulkner Ave",
                address: "909 Woodland St, Michigan, IN",
                beds: 4,
                baths: 3,
                sqft: "8x10",
              },
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$2,400",
                period: "/month",
                title: "St. Crystal",
                address: "210 US Highway, Highland Lake, FL",
                beds: 4,
                baths: 2,
                sqft: "6x8",
              },
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$1,500",
                period: "/month",
                title: "Cove Red",
                address: "243 Curlew Road, Palm Harbor, TX",
                beds: 2,
                baths: 1,
                sqft: "5x7.5",
              },
              {
                image: "/placeholder.svg?height=200&width=300",
                price: "$1,600",
                period: "/month",
                title: "Tarpon Bay",
                address: "103 Lake Shores, Michigan, IN",
                beds: 4,
                baths: 1,
                sqft: "5x7",
              },
            ].map((property, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-blue-600">
                        {property.price}
                      </span>
                      <span className="text-gray-500 ml-1">
                        {property.period}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.address}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.beds} Beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.baths} Bathrooms
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft} m²
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Browse more properties
            </Button>
          </div>
        </div>
      </section>

      {/* Door Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Based on your location</h2>
            <p className="text-gray-600">
              Some of our picked properties near your location.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=200&query=door design ${index}`}
                  alt={`Door ${index}`}
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">View More</Button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Airban Newsroom</h2>
            <h3 className="text-2xl mb-4">Stories and Interviews</h3>
            <p className="text-blue-100 max-w-md">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-700 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Optimizing electricity use for business profitability
                    </h4>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">
                  Learn how to reduce your electricity bills and increase
                  profitability through smart energy management.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">The Airban Journey</h4>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Discover how Airban started and our mission to revolutionize
                  the real estate industry.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-700 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Get in</h4>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">
                  Join our community and stay updated with the latest news and
                  opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Landowner CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a landowner?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Put your email address and get listed.
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email address" className="flex-1" />
            <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
                </div>
                <span className="text-xl font-bold">Airban</span>
              </div>
              <p className="text-blue-100 text-sm">
                © 2021 Airban. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">SELL A HOME</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <Link href="#" className="hover:text-white">
                    Request an offer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">BUY, RENT AND SELL</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <Link href="#" className="hover:text-white">
                    Buy and sell properties
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Rent home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Builder trade-up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">ABOUT</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <Link href="#" className="hover:text-white">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Investors
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-500 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <Link href="#" className="hover:text-white">
                  Terms & Privacy
                </Link>
                <Link href="#" className="hover:text-white">
                  Cookie Policy
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white">
                  Facebook
                </Link>
                <Link href="#" className="hover:text-white">
                  Twitter
                </Link>
                <Link href="#" className="hover:text-white">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
