import type React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import PricingButton from "./PricingButton";
import { getHomePageCrudData } from "@/_lib/fetch-data";
import { BadgeCheck, Info } from "lucide-react";
import parser from "html-react-parser";
import Link from "next/link";

const Pricing = async () => {

	const config = (await getHomePageCrudData().catch((error) => {
		console.error("Failed to fetch homepage data:", error);
		return []; // Ensures config is always an array
	  })) || [];
	  
	  const pricing = config?.[0]?.pricing || []; // ✅ Prevents crash if config[0] is missing
	  

	return (
		<div className="w-11/12 md:w-4/5 mx-auto p-4 md:p-8">
			{/* Buttons Section */}
			<div className="flex justify-center items-center mb-16 relative">
				<PricingButton />
			</div>

			{/* Pricing Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
				{/* Card 1 */}
				{pricing[0] && (
					<Accordion type="single" collapsible className="w-full">
						<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
							<p className="font-semibold text-sm md:text-base">Starts at</p>
							<p className="text-primary-500 py-3 font-black text-5xl">
								${pricing[0].price}
							</p>
							<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricing[0].btnUrl}`}>
								{pricing[0].buttonText}
							</Link>
							<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
								{pricing[0].title}
							</h3>

							<AccordionItem value="details-1">
								<AccordionTrigger className="justify-center">
									See details here
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
											{pricing[0]?.details?.length > 0 ? (
												pricing[0].details.map(
													(detail: { id: number; paragraph: string }) => (
														<li
															key={detail.id}
															className="inline-flex space-x-2"
														>
															<div>
																<BadgeCheck className="text-primary-600" />
															</div>
															<p> {parser(detail.paragraph)}</p>
														</li>
													),
												)
											) : (
												<p>No details available</p>
											)}
										</ul>
									</div>
								</AccordionContent>
							</AccordionItem>
							<Link
								href={`${pricing[0].viewMoreUrl}`}
								className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
							>
								<Info className="w-5 h-5 mr-2" />
								<span>Click Here to View More</span>
							</Link>
						</div>
					</Accordion>
				)}

				{/* Card 2 */}
				{pricing[1] && (
					<Accordion type="single" collapsible className="w-full">
						<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
							<p className="font-semibold text-sm md:text-base">Starts at</p>
							<p className="text-primary-500 py-3 font-black text-5xl">
								${pricing[1].price}
							</p>
							<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricing[1].btnUrl}`}>
								{pricing[1].buttonText}
							</Link>
							<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
								{pricing[1].title}
							</h3>

							<AccordionItem value="details-2">
								<AccordionTrigger className="justify-center">
									See details here
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
											{pricing[1]?.details?.length > 0 ? (
												pricing[1].details.map(
													(detail: { id: number; paragraph: string }) => (
														<li
															key={detail.id}
															className="inline-flex space-x-2"
														>
															<div>
																<BadgeCheck className="text-primary-500" />
															</div>
															<p> {parser(detail.paragraph)}</p>
														</li>
													),
												)
											) : (
												<p>No details available</p>
											)}
										</ul>
									</div>
								</AccordionContent>
							</AccordionItem>

							<Link
								href={`${pricing[1].viewMoreUrl}`}
								className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
							>
								<Info className="w-5 h-5 mr-2" />
								<span>Click Here to View More</span>
							</Link>
						</div>
					</Accordion>
				)}

				{/* Card 3 */}
				{pricing[2] && (
					<Accordion type="single" collapsible className="w-full">
						<div className="relative overflow-hidden bg-white border p-6 rounded-2xl shadow-2xl flex flex-col items-center">
							<div className="absolute right-0 top-0 h-16 w-16">
								<div className="absolute transform rotate-45 text-center bg-secondary-700 text-white text-sm font-semibold py-1 right-[-40px] top-[32px] w-[170px]">
									Most Popular
								</div>
							</div>

							<p className="font-semibold text-sm md:text-base">Starts at</p>
							<p className="text-primary-500 py-3 font-bold text-5xl">
								${pricing[2].price}
							</p>
							<Link href={`${pricing[2].btnUrl}`} className="w-full px-4 py-2 mt-4 bg-secondary-500 hover:bg-secondary-600 text-white text-sm text-nowrap rounded-full">
								{pricing[2].buttonText}
							</Link>
							<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
								{pricing[2].title}
							</h3>

							<AccordionItem value="details-3">
								<AccordionTrigger className="justify-center">
									See details here
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-50 border border-gray-300 p-3 rounded-xl">
											{pricing[2]?.details?.length > 0 ? (
												pricing[2].details.map(
													(detail: { id: number; paragraph: string }) => (
														<li
															key={detail.id}
															className="inline-flex space-x-2"
														>
															<div>
																<BadgeCheck className="text-primary-500" />
															</div>
															<p> {parser(detail.paragraph)}</p>
														</li>
													),
												)
											) : (
												<p>No details available</p>
											)}
										</ul>
									</div>
								</AccordionContent>
							</AccordionItem>

							<Link
								href={`${pricing[2].viewMoreUrl}`}
								className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
							>
								<Info className="w-5 h-5 mr-2" />
								<span>Click Here to View More</span>
							</Link>
						</div>
					</Accordion>
				)}

				{/* Card 4 */}
				{pricing[3] && (
					<Accordion type="single" collapsible className="w-full">
						<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
							<p className="font-semibold text-sm md:text-base">Starts at</p>
							<p className="text-primary-500 py-3 font-semibold text-5xl">
								${pricing[3].price}
							</p>
							<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricing[3].btnUrl}`}>
								{pricing[3].buttonText}
							</Link>
							<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
								{pricing[3].title}
							</h3>

							<AccordionItem value="details-4">
								<AccordionTrigger className="justify-center">
									See details here
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
											{pricing[3]?.details?.length > 0 ? (
												pricing[3].details.map(
													(detail: { id: number; paragraph: string }) => (
														<li
															key={detail.id}
															className="inline-flex space-x-2"
														>
															<div>
																<BadgeCheck className="text-primary-500" />
															</div>
															<p> {parser(detail.paragraph)}</p>
														</li>
													),
												)
											) : (
												<p>No details available</p>
											)}
										</ul>
									</div>
								</AccordionContent>
							</AccordionItem>

							<Link
								href={`${pricing[3].viewMoreUrl}`}
								className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
							>
								<Info className="w-5 h-5 mr-2" />
								<span>Click Here to View More</span>
							</Link>
						</div>
					</Accordion>
				)}
			</div>
		</div>
	);
};

export default Pricing;
