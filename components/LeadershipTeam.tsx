"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Benjamin Eddie Cudjoe",
    title: "Non Executive Director",
    description:
      "Ben has ten (10) years of experience in building engineering and property management. He started his professional career as a building technologist and project manager with Krane Construction Ltd.",
    image: "/assets/eddie.png",
    reverse: false,
  },
  {
    name: "Sandra Osei-Bonsu",
    title: "Chief Risk Officer",
    description:
      "Sandra is responsible for identifying, analyzing and mitigating risk that may be associated with the company’s business operations. She also ensures that all properties scheduled for listing.",
    image: "/assets/sandra.png",
    reverse: true,
  },
  {
  name: "Dennis Owusu Ansah",
  title: "IT Advisor",
  description:
    "Dennis provides strategic guidance on technology and digital transformation. He advises the company on IT infrastructure, cybersecurity, and innovative solutions that support efficient operations and long-term growth.",
  image: "/assets/dennis.jpeg",
  reverse: false,
},

];

export default function LeadershipTeam() {
  return (
    <section className="bg-gradient-to-r from-[#d1e7ff] to-white py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="px-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Leadership Team
          </h2>
          <p className="text-gray-600 mb-12 max-w-lg">
            At the heart of our company is a dynamic leadership team driven by a
            shared vision: to reshape how people engage with real estate. With
            diverse backgrounds in technology, business, design, and customer
            experience, our leaders bring innovation, strategy, and empathy to
            every decision.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                member.reverse ? "md:flex-row-reverse" : ""
              } bg-white rounded-xl shadow-sm overflow-hidden items-center gap-6 p-6 sm:p-0 `}
            >
              <div className="overflow-hidden flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="text-gray-800 max-w-xl p-5">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-airbanBlue font-medium mb-2">
                  {member.title}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
