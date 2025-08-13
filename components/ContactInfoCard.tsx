import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactInfoCard() {
  return (
    <div className="max-w-md space-y-6 text-gray-700 p-10">
      <div>
        <h2 className="text-2xl font-semibold text-black">
          Schedule a Property Tour
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Experience your dream home in person. Contact us to arrange a private
          viewing tailored to your schedule.
        </p>
      </div>

      <hr className="border-gray-400" />

      <div className="space-y-4 text-sm">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Send className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Email</p>
            <p className="text-gray-600">info@myairbanhomes.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Phone</p>
            <a
              href="tel:+233302984032"
              className="text-gray-600 hover:text-airbanBlue transition-colors duration-200 hover:underline"
            >
              (+233) 30 298 4032
            </a>
            <br />
            <a
              href="tel:+233540689387"
              className="text-gray-600 hover:text-airbanBlue transition-colors duration-200 hover:underline"
            >
              (+233) 54 068 9387
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Office Address</p>
            <p className="text-gray-600">Jacob Ave, Accra</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-black mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Office Hours</p>
            <p className="text-gray-600">Mon – Sat: 8:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
