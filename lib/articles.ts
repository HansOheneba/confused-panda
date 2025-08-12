export type Article = {
  id: string;
  title: string;
  content: string; // Markdown text
  imageUrl: string;
  publishedAt: string;
  description: string; // Short description for listing
  links?: Array<{
    title: string;
    url: string;
  }>; // Optional array of external links
};

const articles: Article[] = [
  {
    id: "optimizing-electricity-use-for-business-profitability",
    title: "Optimizing Electricity Use for Business Profitability",
    description:
      "Learn how businesses can reduce electricity costs by up to 25% in the first year while maintaining operational efficiency in Ghana's challenging economic environment.",
    content: `
## Introduction
I have heard people talk about their businesses hitting the rocks year on year due to the high cost of operations. From high taxes to the high cost of utilities and the never-ending saga from regulators. If a business will survive in Ghana, the owners must take a keen interest in minimizing their operational costs as far as electricity is concerned.

As of the end of December 2021, the cost of electricity in Ghana was hovering around **0.369 cedis per kWh for households** and **0.796 cedis kWh for businesses**. Without paying attention to these numbers, it is difficult to sustain a successful business. Hence, it is significant to know what these numbers and their implications mean for business owners in simple terms. How can a business owner cut down on electricity costs without compromising output?

Many have introduced energy-saving equipment purporting to cut down power usage while regulators such as the Energy Commission have put in place serious sanctions on the use of faulty or ineffective equipment which tends to draw a lot more power.

## Understanding The Energy Sector
Before I talk about the best way to optimize electricity, I would like you to understand how the sector works in Ghana. There are six (6) of the 127 megawatts turbines which are managed by the Volta River Authority (VRA). The main sources of power are thermal, and hydroelectricity and this sector is mainly regulated by the government with some private sector participation.

The Ministry of Energy is responsible for formulating policies, monitoring, and evaluating the performance of the sector in Ghana. The government's programme to extend reliable electricity to all parts of the country is championed by the ministry and does not take responsibility for distribution.

### Key Players in Ghana's Energy Sector

**Power Generation:**
- **Volta River Authority** and **Bui Power Authority** are responsible for power generation. This is a state-owned agency tied up with the responsibility of operations of the Akosombo Power Station, Kpong Hydro Power Station, and Bui Hydro Power Station. Along this chain, there are also independent power producers who have been licensed to provide support in power generation.

**Power Distribution:**
- When this power is generated, there is a need to have it supplied across the various facets of the country. There are two names that readily come to mind in this regard i.e., **Electricity Company of Ghana (ECG)** and **Northern Electricity Department Company (NEDCo)**. This may be the first time hearing about NEDCo when you are in the southern most part of the country but those up North are familiar with this name. When you take the map of Ghana and flip it into two equal parts, NEDCo handles the upper and ECG the lower part of Ghana for distribution of power purposes.

**Regulation:**
- "How much am I supposed to pay?" and "what equipment can I use" is a questions answered solely by **PURC** and **Energy Commission** respectively. This means that, when you are engaging any electrical vendor, you are expected to ensure this vendor is a licensed service provider by the Energy Commission. Do you feel cheated? or "you believe you are not paying for the right use of power? If your answer is in the affirmative, then the Public Utilities Regulatory Commission (PURC) is the place to seek redress.

![The Akosombo Dam](/assets/ecg1.png)

## The Way Forward for Electricity
Thermal and solar energy production is the future of Ghana's power generation. Though costly, for businesses, this is the most cost-effective way to keep operations running during difficult times.

Consider solar systems, for example, a firm will require batteries, which have an average life cycle of three years, charge controllers, panels, and an inverter.

This equipment requires a minimum of quarterly maintenance and is dependent on the act of nature to give optimal output. Many people will not tell you the whole truth because it is also their business model to keep afloat.

There have been conversations on the role of unregulated mining activities in the country is causing. One should not lose sight of the danger that is being posed to the citizens. The hardest to be hit is the hydroelectricity generation sector because of their dependence on water and if these activities of the unregulated miners are not clamped down on, we will be heading to the days of power crisis again.

## Get The Best Out of Electricity
Now, giving all this knowledge that has been acquired from electricity, I would like to take this opportunity to run you briefly through how you can optimize your business profitability whiles cutting electricity costs to a **minimum of 25% in the first year**.

This is a tried and tested method across several industries such as Banking, Telecommunications, and Supermarkets just to mention a few. To get the best out of electricity consumed, businesses need to take note of these 3 simple yet important things:

### 1. Audit Your Power Generation System
**Audit the power generation system to check for leakages resulting from faulty equipment.** Most businesses run the machines and fail to maintain them unless it breaks down. You should be familiar with this statement by now; "Do not fix if it is not broken". This is a wrong practice. As a business owner, you need to take interest in your electrical equipment and who services them. You need to be sure the certified service provider audits the power system routinely according to the schedule.

### 2. Monitor What You're Paying For
**Take interest in what you are paying for by monitoring the supply sold to you.** Most electricity bills supplied are "Estimated (E)" instead of "Actual (A)", whatever this means. As a business, you are at risk if you keep having estimated bills for more than 2 months and you fail to take steps to correct this anomaly.

### 3. Use What is Needed, Not What is Supplied
**Use what is needed and not what is supplied.** The fact that the power distribution company is supplying you with excess power does not mean you should exhaust it. Ideally, a 14 sqm space occupied by two (2) officers will need just a 1.5hp operating at an optimal 23 degrees Celsius and not 16 degrees Celsius. This will only put pressure on the capacity, spend more on bill payments and reduce the time of replacing parts.

There is more to do in other to achieve the needed results of an average of **52% savings in 3 years** whether or not there is an increase in tariffs.

## Conclusion
Optimizing electricity use is every business owner's responsibility and not just the technical assistant. First, consider how much money you are regularly allowing to go to waste. It's like the accountant failing to file their tax returns leading to the liabilities of the business becoming weightier than projected and consequently going to jail for this conduct.

Directors, managers, officers, and every other member of a company should not be sheltered from performing their part in enabling the business to flourish. **The success of the business depends on all!**
    `,
    imageUrl: "/assets/ecg2.png",
    publishedAt: "2025-08-12",
    links: [
      {
        title: "Citinewsroom.com",
        url: "https://citinewsroom.com/2022/09/eddie-cudjoe-writes-optimizing-electricity-use-for-business-profitability/",
      },
      {
        title: "Graphic Online",
        url: "https://www.graphic.com.gh/features/opinion/optimizing-electricity-use-for-business-profitability.html",
      },
    ],
  },
  {
    id: "the-airban-journey",
    title: "The Airban Journey",
    description:
      "An exclusive interview with Benjamin Eddie Cudjoe and Sandra, the visionary founders behind Airban Homes, sharing their story, passion, and mission to revolutionize home ownership in Ghana.",
    content: `
## Meet the Visionaries Behind Airban Homes

**Benjamin Eddie Cudjoe**  
*Managing Director, Airban Homes*

![The Akosombo Dam](/assets/story1.png)

There is a name behind every brand. And many people believe that the brand is a reflection of its founder. Who is/are the entrepreneurs behind Airban Homes Company Limited? What is their vision? Did you know that Airban Homes has been operating within the real estate market officially for almost 7 years, but under a different name? Why did they rebrand and who is their target?

We sat with the leadership, **Benjamin and Sandra**, for an interview transcribed below for our interested readers.

## Who is Ben Eddie Cudjoe?

**Ben responds:** Eddie Cudjoe, as he is affectionately known, is a building expert, entrepreneur and philanthropist. He is one of Ghana's most accomplished building engineers, specializing in construction, quantity surveying, and regulatory compliance. Eddie has professional certification in building and law and has worked in the construction industry for over ten years.

## Sandra, when did you discover your passion for real estate?

**Sandra responds:** As part of my job description in the bank, I had to sell the bank's lending product to prospective and existing customers. I realized in all of this, there was one product whose value gives financial independence in many ways. It brings passive income, serves as a long-term security and above all hedges against inflation. Who won't want to venture into such investment, and yes, this was when I developed the interest. I realized most customers I interacted with had no or little knowledge about the industry in Ghana and so when the opportunity came to join Airban Homes, I jumped at it and I have since not looked back.

## What is the Airban Homes story?

We realized the stress people go through just to own a home. From documentations to the land acquisition "wahala" to the "on site building drama". We found an opportunity to be the bridge that links prospective homeowners to reputable vendors.

We started by randomly contacting a developer who has been trying to get his properties out of the market for the past **six (6) years**. He had a listing agreement with a broker and was not seeing results. This was 15 units town house and just five (5) had been sold. Remember in six (6) years just five (5) units. After carrying out our due diligence on the properties, we did the paperwork and voila, **in 3 months, 8 out of the remaining 10 units were off the market**. 

Now the question was, how did we do it? That's our trademark. From that point, we've sold more houses than any realtor can do here in Ghana.

## What is your vision for the brand?

**To be a preferred broker for anything home ownership.**

## Why did you decide to rebrand from "Designs & More" to "Airban Homes"?

We started off as a purely refurbishment and maintenance company but realized there was a lot more need for home ownership than the remodeling. From where to get the financing to getting the best deals in town.

## Given your professional background, you could have focused on other sectors. Why did you choose Real Estate?

For the simple reason being, there's a gap between Regulated Financial Institutions and the property market and we are at a point that we need someone to bring home buyers up to speed on how to own their homes without the hustle of others taking them for a ride.

## Why should readers do business with Airban Homes?

Many of the realtors have little or no knowledge about construction and what actually goes into home ownership. They are set out to sell just anything (whether good or bad). Here at Airban Homes, we're particular about all properties we list onto our platforms. You are sure of having these properties pass the standard due diligence test by any Regulated Financial Institution. 

Above all, our **core values** guide our thoughts in every transaction:
- **Integrity**
- **Professionalism** 
- **Reliability**

## Any final thoughts?

Here at Airban Homes, we make home and property ownership easy, call us for bookings and viewing.

---

We hope you enjoyed our conversation with the founders of Airban Homes Real Estate Company. Keep checking our newsroom for reports and updates on the real estate market, and other exciting stories for your reading pleasure.

**Thinking home ownership? Think Airban Homes!**
    `,
    imageUrl: "/assets/story2.png",
    publishedAt: "2025-08-10",
  },
];

export function getArticles(): Article[] {
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
