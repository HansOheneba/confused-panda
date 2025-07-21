import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactInfoCard() {
  return (
    <div className="max-w-md space-y-6 text-gray-700 p-10">
      <div>
        <h2 className="text-2xl font-semibold text-black">
          Get in touch to schedule
          <br />a visit to your new house.
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Kindly fill this form with your details about your inquiries
          <br />
          and we would respond your inquiry shortly.
        </p>
      </div>

      <hr />

      <div className="space-y-4 text-sm">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Send className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Send an email</p>
            <p className="text-gray-600">contact@ecohavenrealty.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Give us a call</p>
            <p className="text-gray-600">+234905 121 8127</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Office address</p>
            <p className="text-gray-600">
              11, Odo–Olowu, Ijeshatedo B/Stop, Surulere
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Working hours</p>
            <p className="text-gray-600">Mon – Sat: 10am – 4pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
