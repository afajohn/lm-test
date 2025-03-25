"use client";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// For Pricing Section
interface PricingDetails {
	id: string;
	paragraph: string;
}

interface PricingItem {
	id: number;
	price: string;
	title: string;
	buttonText: string;
	btnUrl: string;
	viewMoreUrl: string;
	details?: PricingDetails[];
}
// For Banner Section
interface BannerDetails {
	id: number;
	bannerLogo: string;
	bannerIntroTxt: string;
	bannerImgPreview: string;
}
interface Card {
	id: number;
	cardText: string;
	cardUrl: string;
	cardImg: string;
	cardImgPreview: string;
}

interface BannerItem {
	id: number;
	bannerH1?: string;
	introVideo?: string;
	introVideoPreview?: string;
	bannerDetails?: BannerDetails[];
	cards?: Card[];
}
// For Travel and Meet Section
interface CardTm {
	id: number;
	cardTextTm: string;
	cardUrlTm: string;
	cardImgTm: string;
	cardImgTmPreview: string;
}

interface LiveImgs {
	id: string;
	travImg: string;
	travImgPreview: string;
	travImgTitle: string;
	schedTxt: string;
	linkUrl: string;
}

interface TravelItem {
	id: string;
	liveImg?: LiveImgs[];
	cardsTm?: CardTm[];
}

// For Executive Plan Section
interface ExecutiveImg {
	id: number;
	execImg: string;
	execUrl: string;
	execImgPreview: string;
	execTitle: string;
	execTxt: string;
}

interface CardsExec {
	id: number;
	cardTextExec: string;
	cardUrlExec: string;
	cardImgExec: string;
	cardImgExecPreview: string;
}

interface ExecutiveItems {
	executiveImg?: ExecutiveImg[];
	cardsExec?: CardsExec[];
}

// For Client Testimonials
interface ClientTestimonialItems {
	id: string;
	clientName: string;
	clientComment: string;
}
// For Success Stories
interface SuccessStoriesItems {
	id: string;
	videoImg: string;
	videoImgPreview: string;
	videoUrl: string;
}

// For NewsLetter
interface MatchMakeimages {
	id: string;
	imgUrl: string;
	imgUrlPreview: string;
	email: string;
	matchMakerName: string;
	matchMakerLocation: string;
}

interface NewsLetterItems {
	id: string;
	newsH2: string;
	newsH3: string;
	newsBtn: string;
	newsP: string;
	matchMakeimages?: MatchMakeimages[];
}

// All Sections
interface HomePageData {
	pricing: PricingItem[];
	banner: BannerItem[];
	travelAndMeet: TravelItem[];
	executivePlan: ExecutiveItems[];
	testimonial: ClientTestimonialItems[];
	successStories: SuccessStoriesItems[];
	newsLetter: NewsLetterItems[];
}

function HomePageCrud() {
	const [pricing, setPricing] = useState<PricingItem[]>([]);
	const [banner, setBanner] = useState<BannerItem[]>([]);
	const [travel, setTravel] = useState<TravelItem[]>([]);
	const [executive, setExecutive] = useState<ExecutiveItems[]>([]);
	const [testimonial, setTestimonial] = useState<ClientTestimonialItems[]>([]);
	const [successStories, setSuccessStories] = useState<SuccessStoriesItems[]>([]);
	const [newsLetter, setNewsLetter] = useState<NewsLetterItems[]>([]);

	// Fetch data Array[] START
	useEffect(() => {
		const getCurrentValue = async () => {
			try {
				const response = await fetch(process.env.NEXTAUTH_URL+'/api/homepagecrud');
				const data: HomePageData[] = await response.json();

				if (data[0]?.pricing) {
					setPricing(data[0].pricing);
				}
				if (data[1]?.banner) {
					setBanner(data[1].banner);
				}
				if (data[2]?.travelAndMeet) {
					setTravel(data[2].travelAndMeet);
				}
				if (data[3]?.executivePlan) {
					setExecutive(data[3].executivePlan);
				}
				if (data[4]?.testimonial) {
					setTestimonial(data[4].testimonial);
				}
				if (data[5]?.successStories) {
					setSuccessStories(data[5].successStories);
				}
				if (data[6]?.newsLetter) {
					setNewsLetter(data[6].newsLetter);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};
		getCurrentValue();
	}, []);
	// // Fetch data Array[] END

	// Handle input changes for individual pricing items START
	const handlePriceChange = (id: number, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === id ? { ...item, price: value } : item,
				),
			);
		} catch (error) {
			console.error("Error updating price:", error);
		};
	};

	const handleTitleChange = (id: number, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === id ? { ...item, title: value } : item,
				),
			);
		} catch (error) {
			console.error("Error updating Title:", error);
		};
	};

	const handleButtonTextChange = (id: number, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === id ? { ...item, buttonText: value } : item,
				),
			);
		} catch (error) {
			console.error("Error updating Text:", error);
		};
	};

	const handleButtonUrlChange = (id: number, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === id ? { ...item, btnUrl: value } : item,
				),
			);
		} catch (error) {
			console.error("Error updating Button Text:", error);
		}
	};

	const handleViewMoreUrlChange = (id: number, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === id ? { ...item, viewMoreUrl: value } : item,
				),
			);
		} catch (error) {
			console.error("Error updating URL:", error);
		}
	};

	const handleDetailsParagraphChange = (itemId: number, detailId: string, value: string) => {
		try {
			setPricing((prevPricing) =>
				prevPricing.map((item) =>
					item.id === itemId
						? {
							...item,
							details: item.details?.map((detail) =>
								detail.id === detailId ? { ...detail, paragraph: value } : detail
							),
						}
						: item
				)
			);
		} catch (error) {
			console.error("Error updating Details Paragraph:", error);
		}
	};

	//Handle ADD & DELETE Pricing detail START
	const [newDetailInput, setNewDetailInput] = useState("");

	const handleAddDetail = (pricingId: number) => {
		try {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Pricing Detail Added!",
				showConfirmButton: false,
				timer: 1500
			});
			if (newDetailInput.trim() !== "") {
				const newDetail: PricingDetails = {
					id: String(Math.random()),
					paragraph: newDetailInput.trim(),
				};
				const updatedPricing = pricing.map((item) => {
					if (item.id === pricingId) {
						return {
							...item,
							details: [...(item.details || []), newDetail],
						};
					}
					return item;
				});

				setPricing(updatedPricing);
				setNewDetailInput("");

			}
		} catch (error) {
			console.error("Error Adding Detail:", error);
		}
	};


	const handleDeleteDetail = (pricingId: number, detailId: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					const updatedPricing = pricing.map((item) => {
						if (item.id === pricingId) {
							return {
								...item,
								details: item.details?.filter((detail) => detail.id !== detailId),
							};
						}
						return item;
					});

					setPricing(updatedPricing);
				}
			})
		} catch (error) {
			console.error("Error Deleting Detail:", error);
		}
	};
	//Handle ADD & DELETE Pricing detail END

	// Handle input changes for individual pricing items END

	// Handle input changes for banner items START
	const handleCardTextChange = (
		bannerIndex: number,
		cardId: number,
		value: string,
	) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? {
							...bannerItem,
							cards: bannerItem.cards?.map((card) =>
								card.id === cardId ? { ...card, cardText: value } : card,
							),
						}
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Card Text:", error);
		}
	};

	const handleCardUrlChange = (
		bannerIndex: number,
		cardId: number,
		value: string,
	) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? {
							...bannerItem,
							cards: bannerItem.cards?.map((card) =>
								card.id === cardId ? { ...card, cardUrl: value } : card,
							),
						}
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Card Url:", error);
		}
	};

	const handleCardImgChange = (
		bannerIndex: number,
		cardId: number,
		value: string,
	) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? {
							...bannerItem,
							cards: bannerItem.cards?.map((card) =>
								card.id === cardId ? { ...card, cardImg: value } : card,
							),
						}
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Card Img:", error);
		}
	};

	const handleIntroVideoChange = (bannerIndex: number, value: string) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? { ...bannerItem, introVideo: value }
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Intro Video:", error);
		}
	};

	const handleBannerH1Change = (bannerIndex: number, value: string) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex ? { ...bannerItem, bannerH1: value } : bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Banner H1:", error);
		}
	};

	const handleBannerLogoChange = (
		bannerIndex: number,
		logoId: number,
		value: string,
	) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? {
							...bannerItem,
							bannerDetails: bannerItem.bannerDetails?.map((item) =>
								item.id === logoId ? { ...item, bannerLogo: value } : item,
							),
						}
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Banner Logo:", error);
		}
	};
	const handleBannerDetailChange = (
		bannerIndex: number,
		detailId: number,
		value: string,
	) => {
		try {
			setBanner((prevBanner) =>
				prevBanner.map((bannerItem, index) =>
					index === bannerIndex
						? {
							...bannerItem,
							bannerDetails:
								bannerItem.bannerDetails?.map((item) =>
									item.id === detailId
										? { ...item, bannerIntroTxt: value }
										: item,
								) || [],
						}
						: bannerItem,
				),
			);
		} catch (error) {
			console.error("Error updating Banner Detail:", error);
		}
	};

	// Handle input changes for banner items END

	// Handle input changes for travel & meet items START
	const handleLiveImageChange = (
		travelIndex: number,
		imgId: string,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							liveImg:
								travelItem.liveImg?.map((img) =>
									img.id === imgId ? { ...img, travImg: value } : img,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error updating Live Img:", error);
		}
	};

	const handleLiveTextChange = (
		travelIndex: number,
		textLiveId: string,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							liveImg:
								travelItem.liveImg?.map((text) =>
									text.id === textLiveId ? { ...text, schedTxt: value } : text,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error updating Live Text:", error);
		}
	};

	const handleLiveTitleChange = (
		travelIndex: number,
		textLiveId: string,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							liveImg:
								travelItem.liveImg?.map((text) =>
									text.id === textLiveId ? { ...text, travImgTitle: value } : text,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error updating Title:", error);
		}
	};

	const handleLiveUrlChange = (
		travelIndex: number,
		urlLiveId: string,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							liveImg:
								travelItem.liveImg?.map((url) =>
									url.id === urlLiveId ? { ...url, linkUrl: value } : url,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error updating Live Url:", error);
		}
	};

	// add / delete Live IMG
	const [newLiveImg, setNewLiveImg] = useState({
		travImg: "",
		travImgPreview: "/images/image-preview.png",
		travImgTitle: "",
		schedTxt: "",
		linkUrl: "",
	});

	const handleAddLiveImg = () => {
		try {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Live Details Added!",
				showConfirmButton: false,
				timer: 1500
			});
			const newLiveImgItem = {
				id: `${Date.now()}`,
				travImg: newLiveImg.travImg,
				travImgPreview: newLiveImg.travImgPreview,
				travImgTitle: newLiveImg.travImgTitle,
				schedTxt: newLiveImg.schedTxt,
				linkUrl: newLiveImg.linkUrl
			};

			setTravel((prevTravel) => {
				const updatedTravel = [...prevTravel];

				if (updatedTravel.length > 0) {
					const exist = updatedTravel[0].liveImg?.some(
						(item) => item.id === newLiveImgItem.id
					);

					if (!exist) {
						updatedTravel[0].liveImg = updatedTravel[0].liveImg
							? [...updatedTravel[0].liveImg, newLiveImgItem]
							: [newLiveImgItem];
					}
				}

				return updatedTravel;
			});

			setNewLiveImg({
				travImg: "",
				travImgPreview: "/images/image-preview.png",
				travImgTitle: "",
				schedTxt: "",
				linkUrl: "",
			});
		} catch (error) {
			console.error("Error Adding Live Img:", error);
		}
	};

	const handleLiveImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewLiveImg((prev) => ({
				...prev,
				travImg: e.target.value,
			}));
		} catch (error) {
			console.error("Error Live Img Change:", error);
		}
	};

	const handleLiveImgTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewLiveImg((prev) => ({
				...prev,
				travImgTitle: e.target.value,
			}));
		} catch (error) {
			console.error("Error Live Title Change:", error);
		}
	};

	const handleLiveSchedTxtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewLiveImg((prev) => ({
				...prev,
				schedTxt: e.target.value,
			}));
		} catch (error) {
			console.error("Error Live Shed Change:", error);
		}
	};

	const handleLiveLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewLiveImg((prev) => ({
				...prev,
				linkUrl: e.target.value,
			}));
		} catch (error) {
			console.error("Error Live Link Change:", error);
		}
	};

	const handleDeleteLiveImg = (travelId: string, liveImgId: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					setTravel((prevTravel) => {
						const updatedTravel = prevTravel.map((item) => {
							if (item.id === travelId) {
								return {
									...item,
									liveImg: item.liveImg?.filter((liveimg) => liveimg.id !== liveImgId),
								};
							}
							return item;
						});
						return updatedTravel;
					});
				}
			});
		} catch (error) {
			console.error("Error Deleting Live Img:", error);
		}
	};

	const handleCardTextTmChange = (
		travelIndex: number,
		textTmId: number,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							cardsTm:
								travelItem.cardsTm?.map((text) =>
									text.id === textTmId ? { ...text, cardTextTm: value } : text,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error Card Text Change:", error);
		}
	};

	const handleCardUrlTmChange = (
		travelIndex: number,
		textTmId: number,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							cardsTm:
								travelItem.cardsTm?.map((text) =>
									text.id === textTmId ? { ...text, cardUrlTm: value } : text,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error Card Url Change:", error);
		}
	};

	const handleCardImgTmChange = (
		travelIndex: number,
		imgTmId: number,
		value: string,
	) => {
		try {
			setTravel((prevTravel) =>
				prevTravel.map((travelItem, index) =>
					index === travelIndex
						? {
							...travelItem,
							cardsTm:
								travelItem.cardsTm?.map((img) =>
									img.id === imgTmId ? { ...img, cardImgTm: value } : img,
								) || [],
						}
						: travelItem,
				),
			);
		} catch (error) {
			console.error("Error Card Img Change:", error);
		}
	};
	// Handle input changes for travel & meet items END

	// Handle input changes for executive plan START
	const handleExecuImageChange = (
		execuIndex: number,
		imgId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							executiveImg:
								execItem.executiveImg?.map((img) =>
									img.id === imgId ? { ...img, execImg: value } : img,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Img Change:", error);
		}
	};

	const handleExecuTitleChange = (
		execuIndex: number,
		imgId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							executiveImg:
								execItem.executiveImg?.map((img) =>
									img.id === imgId ? { ...img, execTitle: value } : img,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Title Change:", error);
		}
	};

	const handleExecuUrlChange = (
		execuIndex: number,
		imgId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							executiveImg:
								execItem.executiveImg?.map((img) =>
									img.id === imgId ? { ...img, execUrl: value } : img,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Url Change:", error);
		}
	};

	const handleExecuTextChange = (
		execuIndex: number,
		imgId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							executiveImg:
								execItem.executiveImg?.map((img) =>
									img.id === imgId ? { ...img, execTxt: value } : img,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Text Change:", error);
		}
	};

	const handleExecuCardTextChange = (
		execuIndex: number,
		exeCardTxtId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							cardsExec:
								execItem.cardsExec?.map((card) =>
									card.id === exeCardTxtId
										? { ...card, cardTextExec: value }
										: card,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Card Text Change:", error);
		}
	};

	const handleExecuCardUrlChange = (
		execuIndex: number,
		exeCardTxtId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							cardsExec:
								execItem.cardsExec?.map((card) =>
									card.id === exeCardTxtId
										? { ...card, cardUrlExec: value }
										: card,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Execu Card Url Change:", error);
		}
	};

	const handleExecuCardImgChange = (
		execuIndex: number,
		exeCardImgId: number,
		value: string,
	) => {
		try {
			setExecutive((prevExecu) =>
				prevExecu.map((execItem, index) =>
					index === execuIndex
						? {
							...execItem,
							cardsExec:
								execItem.cardsExec?.map((card) =>
									card.id === exeCardImgId
										? { ...card, cardImgExec: value }
										: card,
								) || [],
						}
						: execItem,
				),
			);
		} catch (error) {
			console.error("Error Card Img Change:", error);
		}
	};

	// Handle input changes for executive plan END

	// Handle input changes for Client testimonials START
	const handleTestimonialNameChange = (
		testimonialIndex: number,
		value: string,
	) => {
		try {
			setTestimonial((prevTestimonial) =>
				prevTestimonial.map((testimonialItem, index) =>
					index === testimonialIndex
						? { ...testimonialItem, clientName: value }
						: testimonialItem,
				),
			);
		} catch (error) {
			console.error("Error Client Name Change:", error);
		}
	};


	const handleTestimonialCommentChange = (
		testimonialIndex: number,
		value: string,
	) => {
		try {
			setTestimonial((prevTestimonial) =>
				prevTestimonial.map((testimonialItem, index) =>
					index === testimonialIndex
						? { ...testimonialItem, clientComment: value }
						: testimonialItem,
				),
			);
		} catch (error) {
			console.error("Error Testimonial Change:", error);
		}
	};
	// Handle input changes for Client testimonials END

	// Handle Add Testimonial START
	const [newTestimonial, setNewTestimonial] = useState({
		clientName: "",
		clientComment: "",
	});
	const handleAddTestimonial = () => {
		try {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Client Testimonial Added!",
				showConfirmButton: false,
				timer: 1500
			});
			const newTestimonialItem = {
				id: `${Date.now()}`,
				clientName: newTestimonial.clientName,
				clientComment: newTestimonial.clientComment,
			};

			setTestimonial((prevTestimonial) => [...prevTestimonial, newTestimonialItem]);

			setNewTestimonial({
				clientName: "",
				clientComment: "",
			});
		} catch (error) {
			console.error("Error Adding Testimonial:", error);
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewTestimonial((prev) => ({
				...prev,
				clientName: e.target.value,
			}));
		} catch (error) {
			console.error("Error Name Change:", error);
		}
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			setNewTestimonial((prev) => ({
				...prev,
				clientComment: e.target.value,
			}));
		} catch (error) {
			console.error("Error Comment Change:", error);
		}
	};
	// Handle Add Testimonial END

	// Handle Delete Testimonial START
	const handleDeleteTestimonial = (testimonialId: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					setTestimonial((prevTestimonial) =>
						prevTestimonial.filter((testimonialItem) => testimonialItem.id !== testimonialId)
					);
				}
			})
		} catch (error) {
			console.error("Error Deleting Testimonial:", error);
		}
	};
	// Handle Delete Testimonial END

	// Handle input changes for Success Stories START
	const handleSuccessStoryVideoImgChange = (
		successStoriesIndex: number,
		value: string,
	) => {
		try {
			setSuccessStories((prevSuccessStories) =>
				prevSuccessStories.map((successStoriesItem, index) =>
					index === successStoriesIndex
						? { ...successStoriesItem, videoImg: value }
						: successStoriesItem,
				),
			);
		} catch (error) {
			console.error("Error Img Change:", error);
		}
	};

	const handleSuccessStoryVideoUrlChange = (
		successStoriesIndex: number,
		value: string,
	) => {
		try {
			setSuccessStories((prevSuccessStories) =>
				prevSuccessStories.map((successStoriesItem, index) =>
					index === successStoriesIndex
						? { ...successStoriesItem, videoUrl: value }
						: successStoriesItem,
				),
			);
		} catch (error) {
			console.error("Error Video Url Change:", error);
		}
	};

	const [newSuccessStories, setNewSuccessStories] = useState({
		videoImg: "",
		videoUrl: "",
		videoImgPreview: "/images/image-preview.png",
	});
	const handleAddSuccessStories = () => {
		try {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Success Story Video Added!",
				showConfirmButton: false,
				timer: 1500
			});

			const newSuccessStoriesItem = {
				id: `${Date.now()}`,
				videoImg: newSuccessStories.videoImg,
				videoUrl: newSuccessStories.videoUrl,
				videoImgPreview: newSuccessStories.videoImgPreview,
			};

			setSuccessStories((prevSuccessStories) => [...prevSuccessStories, newSuccessStoriesItem]);

			setNewSuccessStories({
				videoImg: "",
				videoUrl: "",
				videoImgPreview: "/images/image-preview.png",
			});
		} catch (error) {
			console.error("Error Adding Success Story Video:", error);
		}
	};

	const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewSuccessStories((prev) => ({
				...prev,
				videoImg: e.target.value,
			}));
		} catch (error) {
			console.error("Error Img Change:", error);
		}
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewSuccessStories((prev) => ({
				...prev,
				videoUrl: e.target.value,
			}));
		} catch (error) {
			console.error("Error Url Change:", error);
		}
	};

	const handleDeleteSuccessStories = (successStoriesId: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					setSuccessStories((prevSuccessStories) =>
						prevSuccessStories.filter((successStoriesItem) => successStoriesItem.id !== successStoriesId)
					);
				}
			})
		} catch (error) {
			console.error("Error Deleting Success Story:", error);
		}
	};
	// Handle input changes for Success Stories END

	// Handle NewsLetter input changes START
	const handleNewsH2Change = (newsLetterIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? { ...newsLetterItem, newsH2: value }
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error News H2 Change:", error);
		}
	};

	const handleNewsH3Change = (newsLetterIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? { ...newsLetterItem, newsH3: value }
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error News H3 Change:", error);
		}
	};

	const handleNewsBtnChange = (newsLetterIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? { ...newsLetterItem, newsBtn: value }
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error News Btn Change:", error);
		}
	};
	const handleNewsPChange = (newsLetterIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? { ...newsLetterItem, newsP: value }
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error News P change:", error);
		}
	};

	const handleMatchmakeEmailEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? {
							...newsLetterItem,
							matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
								i === imageIndex
									? { ...image, email: value }
									: image
							)
						}
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error Email change:", error);
		}
	};

	const handleMatchmakeNameEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? {
							...newsLetterItem,
							matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
								i === imageIndex
									? { ...image, matchMakerName: value }
									: image
							)
						}
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error Name change:", error);
		}
	};

	const handleMatchmakeLocationEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? {
							...newsLetterItem,
							matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
								i === imageIndex
									? { ...image, matchMakerLocation: value }
									: image
							)
						}
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error Location change:", error);
		}
	};

	const handleMatchmakeImageChange = (newsLetterIndex: number, imageIndex: number, value: string) => {
		try {
			setNewsLetter((prevnewsLetter) =>
				prevnewsLetter.map((newsLetterItem, index) =>
					index === newsLetterIndex
						? {
							...newsLetterItem,
							matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
								i === imageIndex
									? { ...image, imgUrl: value }
									: image
							)
						}
						: newsLetterItem
				)
			);
		} catch (error) {
			console.error("Error Img change:", error);
		}
	};

	const [newMatchmaker, setNewMatchmaker] = useState({
		imgUrl: "",
		email: "",
		imgUrlPreview: "/images/image-preview.png",
		matchMakerName: "",
		matchMakerLocation: ""
	});

	const handleAddMatchmaker = () => {
		try {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Matchmaker Added!",
				showConfirmButton: false,
				timer: 1500
			});
			const newMatchMakerItem = {
				id: `${Date.now()}`,
				imgUrl: newMatchmaker.imgUrl,
				email: newMatchmaker.email,
				imgUrlPreview: newMatchmaker.imgUrlPreview,
				matchMakerName: newMatchmaker.matchMakerName,
				matchMakerLocation: newMatchmaker.matchMakerLocation,
			};

			setNewsLetter((prevNewsLetter) => {
				const updatedNewsLetter = [...prevNewsLetter];

				if (updatedNewsLetter.length > 0) {
					const exists = updatedNewsLetter[0].matchMakeimages?.some(
						(item) => item.id === newMatchMakerItem.id
					);

					if (!exists) {
						updatedNewsLetter[0].matchMakeimages = updatedNewsLetter[0].matchMakeimages
							? [...updatedNewsLetter[0].matchMakeimages, newMatchMakerItem]
							: [newMatchMakerItem];
					}
				}

				return updatedNewsLetter;
			});

			setNewMatchmaker({
				imgUrl: "",
				email: "",
				imgUrlPreview: "/images/image-preview.png",
				matchMakerName: "",
				matchMakerLocation: ""
			});
		} catch (error) {
			console.error("Error Adding Matchmaker:", error);
		}
	};


	const handleMatchmakeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewMatchmaker((prev) => ({
				...prev,
				imgUrl: e.target.value,
			}));
		} catch (error) {
			console.error("Error Url change:", error);
		}
	};

	const handleMatchmakeEmailChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewMatchmaker((prev) => ({
				...prev,
				email: e.target.value,
			}));
		} catch (error) {
			console.error("Error Email change:", error);
		}
	};

	const handleMatchmakeNameChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewMatchmaker((prev) => ({
				...prev,
				matchMakerName: e.target.value,
			}));
		} catch (error) {
			console.error("Error Name change:", error);
		}
	};

	const handleMatchmakeLocationChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setNewMatchmaker((prev) => ({
				...prev,
				matchMakerLocation: e.target.value,
			}));
		} catch (error) {
			console.error("Error Location change:", error);
		}
	};

	const handleDeleteMatchmaker = (newsLetterId: string, matchMakeId: string) => {
		try{
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedNewsLetter = newsLetter.map((item) => {
					if (item.id === newsLetterId) {
						return {
							...item,
							matchMakeimages: item.matchMakeimages?.filter((matchmaker) => matchmaker.id !== matchMakeId),
						};
					}
					return item;
				});

				setNewsLetter(updatedNewsLetter);
			}
		})
	} catch (error) {
		console.error("Error Deleting Matchmaker:", error);
	}
	};
	// Handle NewsLetter input changes START

	// Handle SAVE ALL DATA START
	const saveAllData = async () => {
		try {
			const formData = new FormData();
			formData.append("price", JSON.stringify(pricing));
			formData.append("banner", JSON.stringify(banner));
			formData.append("travelAndMeet", JSON.stringify(travel));
			formData.append("executivePlan", JSON.stringify(executive));
			formData.append("testimonial", JSON.stringify(testimonial));
			formData.append("successStories", JSON.stringify(successStories));
			formData.append("newsLetter", JSON.stringify(newsLetter));

			const response = await fetch(process.env.NEXTAUTH_URL+'/api/homepagecrud', {
				method: "PUT",
				body: formData,
			});

			if (response.ok) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Changes Saved!",
					showConfirmButton: false,
					timer: 1500
				});
			} else {
				alert("Error updating data");
			}
		} catch (err) {
			console.error("Error updating data:", err);
			alert("Error updating data");
		}
	};
	// Handle SAVE ALL DATA END

	return (
		<>
			<h1 className="text-center font-bold text-xl md:text-5xl py-2 flex gap-3 justify-center">
				Home Page Sections Editor <span className="animate-pulse">💻</span>
			</h1>
			<div className="flex flex-col bg-black/85 py-2 px-5 rounded-2xl">
				<div className="pt-2 text-sm">
					{/* Banner Section */}
					<div className="py-3 px-2 border rounded-xl bg-green-50 max-h-[46rem] overflow-auto">
						<h2 className="font-bold text-xl md:text-3xl pb-2 inline-flex gap-5"><span className="underline">Edit ➡ Banner Section</span></h2>
						{banner.length > 0 ? (
							<div className="flex justify-evenly">
								{banner.map((bannerItem, bannerIndex) => (
									<div
										key={bannerItem.id}
										className="flex flex-col xl:flex-row items-center gap-3"
									>
										{/* Banner Left  Intro Video*/}
										<div className="px-2 py-2 border border-green-600 rounded-xl flex flex-col gap-2 items-center">
											<p className="font-bold">Banner H1:</p>
											<textarea
												cols={30}
												rows={2}
												value={bannerItem.bannerH1}
												onChange={(e) =>
													handleBannerH1Change(bannerIndex, e.target.value)
												}
												className="border p-2 rounded italic"
											/>
											<div>
												{bannerItem.bannerDetails?.map((item) => (
													<div
														key={item.id}
														className="flex flex-col items-center"
													>
														<p className="font-bold">Logo URL Value:</p>
														<input
															type="text"
															value={item.bannerLogo}
															onChange={(e) =>
																handleBannerLogoChange(
																	bannerIndex,
																	item.id,
																	e.target.value,
																)
															}
															className="border p-2 my-1 rounded italic "
														/>
														<p className="font-bold">Logo Preview:</p>
														<Image
															src={item.bannerLogo || item.bannerImgPreview}
															alt="Banner Card Img"
															width={180}
															height={180}
															loading="lazy"

														/>
														<label
															className="font-bold"
															htmlFor="banner-details"
														>
															Banner Text Detail:
														</label>
														<textarea
															cols={35}
															rows={2}
															value={item.bannerIntroTxt}
															onChange={(e) =>
																handleBannerDetailChange(
																	bannerIndex,
																	item.id,
																	e.target.value,
																)
															}
															className="border p-2 rounded italic"
														/>
													</div>
												))}
											</div>

											<label className="font-bold" htmlFor="introVideo">
												Intro-Vid (Embed) URL:
											</label>

											<input
												type="text"
												value={bannerItem.introVideo}
												onChange={(e) =>
													handleIntroVideoChange(bannerIndex, e.target.value)
												}
												className="border p-2 rounded italic"
											/>
											<div className="text-center">
												<p className="font-bold mb-2">Video Preview:</p>
												<iframe
													width={280}
													height={150}
													title="intro-vid"
													allowFullScreen
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													src={bannerItem.introVideo || bannerItem.introVideoPreview}
													className="rounded-xl"
												/>
											</div>
										</div>

										{/* Banner Right Cards  */}
										<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-2">
											{bannerItem.cards?.map((card) => (
												<div key={card.id} className="border border-green-600 rounded-xl p-2 my-3">
													<div className="flex flex-col items-center gap-3 py-2">
														<p className="font-bold">
															Ladies Profiles Card: {card.id}
														</p>
														<label className="font-bold" htmlFor="cardText">
															Card Text:
														</label>
														<input
															type="text"
															value={card.cardText}
															onChange={(e) =>
																handleCardTextChange(
																	bannerIndex,
																	card.id,
																	e.target.value,
																)
															}
															className="border p-2 rounded italic"
														/>

														<p className="font-bold text-center">Card URL:</p>
														<input
															type="text"
															value={card.cardUrl}
															onChange={(e) =>
																handleCardUrlChange(
																	bannerIndex,
																	card.id,
																	e.target.value,
																)
															}
															className="border p-2 rounded italic"
														/>
														<label className="font-bold" htmlFor="img-value">
															Image URL Value:
														</label>
														<input
															type="text"
															value={card.cardImg}
															onChange={(e) =>
																handleCardImgChange(
																	bannerIndex,
																	card.id,
																	e.target.value,
																)
															}
															className="border p-2 rounded italic"
														/>
														<label className="font-bold" htmlFor="img">
															Image Preview:
														</label>
														<Image
															src={card.cardImg || card.cardImgPreview}
															alt="Banner Card Img"
															width={100}
															height={100}
															loading="lazy"
															className="rounded-xl"
														/>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						) : (
							<p>Loading Banner...</p>
						)}
						{/* Save Button */}
						<div className="pt-2 text-center">
							<button
								type="button"
								onClick={saveAllData}
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
									Save Changes
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* Travel and Meet Section */}
				<div className="my-3 p-2 border rounded-xl text-sm bg-yellow-50 max-h-[46rem] overflow-auto">
					<h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ Travel & Meet Section</span></h2>
					<div className="flex flex-col items-center justify-center">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
							{/* Add */}
							<div className="flex flex-col gap-1 items-center justify-center p-2 border border-yellow-400 rounded-xl">
								<h2 className="font-bold">Add New Live Image</h2>

								<div className="flex flex-col gap-1 items-center">
									<p className="font-bold">Image Preview:</p>
									<Image
										src={newLiveImg.travImg || newLiveImg.travImgPreview}
										width={100}
										height={100}
										alt="Live Webcast Image"
										loading="lazy"
										className="max-w-[5rem]"
									/>
									<p className="font-bold">T&M Live Img :</p>
									<input
										type="text"
										placeholder="Live Image"
										value={newLiveImg.travImg}
										onChange={handleLiveImgChange}
										className="rounded border p-2"
									/>
									<p className="font-bold">T&M Live Title :</p>
									<input
										type="text"
										placeholder="Live Title"
										value={newLiveImg.travImgTitle}
										onChange={handleLiveImgTitleChange}
										className="rounded border p-2"
									/>
									<p className="font-bold">T&M Live Schedule :</p>
									<input
										type="text"
										placeholder="Live Schedule"
										value={newLiveImg.schedTxt}
										onChange={handleLiveSchedTxtChange}
										className="rounded border p-2"
									/>
									<p className="font-bold">T&M Live URL :</p>
									<input
										type="text"
										placeholder="Live Link URL"
										value={newLiveImg.linkUrl}
										onChange={handleLiveLinkUrlChange}
										className="rounded border p-2"
									/>
								</div>
								<button
									type="button"
									className="border border-black py-2 px-3 bg-green-600 hover:bg-green-400 text-white rounded mt-1"
									onClick={handleAddLiveImg}
								>
									Add
								</button>
							</div>
							{/* Left Live Img */}
							{travel.length > 0 && travel[0].liveImg ? (
								travel.map((travelItem, travelIndex) =>
									travelItem.liveImg?.map((img) => (
										<div key={img.id}>
											<div className="flex m-1">
												<div className=" flex flex-col gap-2 items-center border border-yellow-400 rounded-xl p-2">
													<div className="flex flex-col">
														<p className="text-sm text-center font-bold">
															Travel & Meet Live Schedule : {img.id}
														</p>
														<p className="text-sm text-center font-bold">
															Image Preview:
														</p>
														<Image
															src={img.travImg || img.travImgPreview}
															width={100}
															height={100}
															alt="Live Webcast Image"
															loading="lazy"
															className="max-w-[10rem] mx-auto rounded-xl"
														/>
													</div>
													<div className="flex flex-col gap-1">
														<label
															className="text-sm text-center font-bold"
															htmlFor={`TM-image-edit-${img.id}`}
														>
															Image URL Value:
														</label>
														<input
															type="text"
															value={img.travImg}
															onChange={(e) =>
																handleLiveImageChange(
																	travelIndex,
																	img.id,
																	e.target.value,
																)
															}
															className="border p-2 rounded italic"
														/>
														<p className="font-bold text-center">
															Sched Title Value:
														</p>
														<input
															type="text"
															value={img.travImgTitle}
															onChange={(e) =>
																handleLiveTitleChange(
																	travelIndex,
																	img.id,
																	e.target.value,
																)
															}
															className="p-2 border rounded text-sm italic"
														/>
														<label
															className="text-sm text-center font-bold"
															htmlFor={`TM-Sched-text-edit-${img.id}`}
														>
															Sched Text Value:
														</label>
														<input
															type="text"
															value={img.schedTxt}
															onChange={(e) =>
																handleLiveTextChange(
																	travelIndex,
																	img.id,
																	e.target.value,
																)
															}
															className="p-2 border rounded text-sm italic"
														/>
														<label
															className="text-sm text-center font-bold"
															htmlFor={`TM-URL-edit-${img.id}`}
														>
															URL Value:
														</label>
														<input
															type="text"
															value={img.linkUrl}
															onChange={(e) =>
																handleLiveUrlChange(
																	travelIndex,
																	img.id,
																	e.target.value,
																)
															}
															className="p-2 border rounded text-sm italic"
														/>
													</div>
													{/* Delete */}
													<button
														type="button"
														className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
														onClick={() => handleDeleteLiveImg(travelItem.id, img.id)}
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									)),
								)
							) : (
								<p>Loading Travel Meet Live images...</p>
							)}
						</div>
						{/* Right Cards Tm */}
						<div className="flex flex-col p-2">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
								{travel.length > 0 && travel[0].cardsTm ? (
									travel.map((travelItem, travelIndex) =>
										travelItem.cardsTm?.map((card) => (
											<div
												key={card.id}
												className="flex flex-col items-center p-2 gap-2 border border-yellow-400 rounded-xl"
											>
												<p className="font-bold">
													Travel & Meet Card: {card.id}
												</p>
												<label className="font-bold" htmlFor="cardtext">
													Card Text:
												</label>
												<input
													type="text"
													name="cardtext"
													value={card.cardTextTm}
													onChange={(e) =>
														handleCardTextTmChange(
															travelIndex,
															card.id,
															e.target.value,
														)
													}
													className="border p-2 rounded italic"
												/>
												<p className="font-bold text-center">Card URL:</p>
												<input
													type="text"
													name="cardtext"
													value={card.cardUrlTm}
													onChange={(e) =>
														handleCardUrlTmChange(
															travelIndex,
															card.id,
															e.target.value,
														)
													}
													className="border p-2 rounded italic"
												/>
												<label className="font-bold" htmlFor="img-value">
													Image URL Value:
												</label>
												<input
													type="text"
													value={card.cardImgTm}
													onChange={(e) =>
														handleCardImgTmChange(
															travelIndex,
															card.id,
															e.target.value,
														)
													}
													className="border p-2 rounded italic"
												/>
												<p className="font-bold">Image Preview:</p>
												<Image
													src={card.cardImgTm || card.cardImgTmPreview}
													width={100}
													height={100}
													alt="Travel and Meet Card Image"
													loading="lazy"
													className="rounded-xl"
												/>
											</div>
										)),
									)
								) : (
									<p>Loading Travel Meet Cards...</p>
								)}
							</div>
						</div>
					</div>
					{/* Save Button */}
					<div className="pt-2 text-center">
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>
				</div>

				{/* Testimonial Section */}
				<div className="my-3 py-1 px-2 border rounded-xl text-sm bg-red-50 max-h-[46rem] overflow-auto">
					<h2 className="font-bold text-xl md:text-3xl my-2 inline-flex gap-5"><span className="underline">Edit ➡ Testimonial Section</span></h2>
					<div className="py-3 flex flex-col lg:flex-row gap-5 items-center justify-center">
						{/* Add */}
						<div className="flex flex-col items-center p-2 border border-red-500 rounded-xl">
							<h2 className="font-bold">Add New Testimonial</h2>
							<div className="grid gap-4 py-4">
								<p className="font-bold">Name:</p>
								<input
									type="text"
									value={newTestimonial.clientName}
									placeholder="Client Name"
									onChange={handleNameChange}
									className="rounded border p-2"
								/>
								<p className="font-bold">Client Comment:</p>
								<textarea
									cols={25}
									rows={3}
									placeholder="Client's Testimonial here..."
									value={newTestimonial.clientComment}
									onChange={handleCommentChange}
									className="rounded border p-2"
								/>
							</div>
							<button
								type="button"
								onClick={handleAddTestimonial}
								className="px-3 py-2 rounded border border-black bg-green-600 hover:bg-green-400 text-white"
							>
								Add
							</button>
						</div>
						{testimonial.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 items-center justify-center">
								{testimonial.map((testimonialItem, testimonialIndex) => (
									<div key={testimonialItem.id}>
										<div className="flex flex-col items-center gap-2 border border-red-500 p-2 rounded-xl">
											<p className="font-bold">TESTIMONIAL {testimonialItem.id}</p>

											<p className="font-bold">Client Name:</p>
											<input
												type="text"
												value={testimonialItem.clientName}
												onChange={(e) =>
													handleTestimonialNameChange(
														testimonialIndex,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>
											<p className="font-bold">Client Testimonial:</p>
											<textarea
												cols={20}
												rows={5}
												value={testimonialItem.clientComment}
												onChange={(e) =>
													handleTestimonialCommentChange(
														testimonialIndex,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>
											{/* Delete */}
											<button
												type="button"
												className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
												onClick={() => handleDeleteTestimonial(testimonialItem.id)} // Pass the testimonial ID
											>
												Delete
											</button>

										</div>
									</div>
								))}
							</div>
						) : (
							<p>Loading Testimonials...</p>
						)}
					</div>
					{/* Save Button */}
					<div className="pt-2 text-center">
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>

				</div>

				{/* Success Stories */}
				<div className="my-3 py-3 px-2 text-sm bg-green-50 rounded-xl max-h-[46rem] overflow-auto">
					<h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ Success Stories Section</span></h2>
					{/* Add */}
					<div className="flex flex-col items-center">
						<div className="p-2 border border-green-600 rounded-xl flex flex-col items-center">
							<h2 className="font-bold">Add New Success Stories</h2>
							<div className="flex flex-col md:flex-row gap-4 p-3">
								<div className="flex flex-col gap-4 py-4">
									<p className="font-bold">Image Path:</p>
									<input
										type="text"
										value={newSuccessStories.videoImg}
										placeholder="Video Image"
										onChange={handleImgChange}
										className="rounded border p-2"
									/>
									<p className="font-bold">Video (Embed) Url:</p>
									<input
										type="text"
										placeholder="Youtube Video (embed) Url:"
										value={newSuccessStories.videoUrl}
										onChange={handleUrlChange}
										className="rounded border p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 items-center overflow-hidden">
									<p className="font-bold">Image Preview:</p>
									<Image
										src={newSuccessStories.videoImg || newSuccessStories.videoImgPreview}
										alt={"Success Story Image"}
										width={100}
										height={100}
										loading="lazy"
										className="rounded-xl"
									/>
									<p className="font-bold">Video Preview:</p>
									<iframe
										title="success-vid"
										width={250}
										height={135}
										allowFullScreen
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										src={newSuccessStories.videoUrl || newSuccessStories.videoImgPreview}
										className="rounded-xl"
									/>
								</div>
							</div>
							<button
								type="button"
								onClick={handleAddSuccessStories}
								className="px-3 py-2 rounded border border-black bg-green-600 hover:bg-green-400 text-white"
							>
								Add
							</button>
						</div>
					</div>
					{successStories.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 items-center justify-center rounded py-2 px-3">
							{successStories.map((successStoriesItem, successStoriesIndex) => (
								<div
									key={successStoriesItem.id}
									className="border border-green-600 rounded-xl p-2 flex flex-col gap-2 items-center">
									<p className="font-bold">Success Stories - {successStoriesItem.id} </p>
									<p className="font-bold">Video Image URL :</p>
									<input
										type="text"
										value={successStoriesItem.videoImg}
										onChange={(e) =>
											handleSuccessStoryVideoImgChange(
												successStoriesIndex,
												e.target.value,
											)
										}
										className="p-2 rounded border italic"
									/>
									<p className="font-bold">Image Preview:</p>
									<Image
										src={successStoriesItem.videoImg || successStoriesItem.videoImgPreview}
										alt="Success Stories"
										width={100}
										height={100}
										loading="lazy"
										className="rounded-xl"
									/>
									<p className="font-bold">Video (Embed) Url:</p>
									<input
										type="text"
										value={successStoriesItem.videoUrl}
										onChange={(e) =>
											handleSuccessStoryVideoUrlChange(
												successStoriesIndex,
												e.target.value,
											)
										}
										className="p-2 rounded border italic"
									/>

									<p className="font-bold">Video Preview:</p>
									<iframe
										title="success-vid"
										width={250}
										height={200}
										allowFullScreen
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										src={successStoriesItem.videoUrl || successStoriesItem.videoImgPreview}
										className="rounded-xl"
									/>
									{/* Delete */}
									<button
										type="button"
										className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
										onClick={() => handleDeleteSuccessStories(successStoriesItem.id)}
									>
										Delete
									</button>
								</div>
							))}
						</div>
					) : (
						<p>Loading Success Stories...</p>
					)}
					{/* Save Button */}
					<div className="pt-2 text-center">
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>
				</div>

				{/* NewsLetter Section */}
				<div className="py-3 my-3 px-2 border rounded-xl text-sm bg-yellow-50 max-h-[46rem] overflow-auto">
					<h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ News Letter Section</span></h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:flex  gap-5 justify-center items-center">
						{newsLetter.length > 0 ? (
							newsLetter.map((newsLetterItem, index) => (
								<div
									key={newsLetterItem.id || `${newsLetterItem.newsH2}-${index}`}
								>
									<div className="flex flex-col gap-3 border border-yellow-400 p-2 rounded-xl">

										<p className="font-bold">H2 Value:</p>
										<input
											type="text"
											value={newsLetterItem.newsH2}
											onChange={(e) =>
												handleNewsH2Change(index, e.target.value)
											}
											className="p-2 rounded border italic"
										/>
										<p className="font-bold">H3 Value:</p>
										<input
											type="text"
											value={newsLetterItem.newsH3}
											onChange={(e) =>
												handleNewsH3Change(index, e.target.value)
											}
											className="p-2 rounded border italic"
										/>


										<p className="font-bold">Button text Value:</p>
										<input
											type="text"
											value={newsLetterItem.newsBtn}
											onChange={(e) =>
												handleNewsBtnChange(index, e.target.value)
											}
											className="p-2 rounded border italic"
										/>
										<p className="font-bold">Description Value:</p>
										<textarea
											cols={28}
											rows={4}
											value={newsLetterItem.newsP}
											onChange={(e) =>
												handleNewsPChange(index, e.target.value)
											}
											className="p-2 rounded border italic"
										/>

									</div>
								</div>
							))
						) : (
							<p>Loading NewsLetter...</p>
						)}

						{/* add */}
						<div className="flex flex-col justify-center items-center p-2 border border-yellow-400 rounded-xl">
							<h2 className="font-bold">Add New Matchmaker</h2>
							<div className="flex flex-col lg:flex-row gap-2 py-4">
								<div className="flex flex-col gap-1">
									<p className="font-bold">Match Maker Email:</p>
									<input
										type="text"
										placeholder="Match Maker Email"
										value={newMatchmaker.email}
										onChange={handleMatchmakeEmailChanges}
										className="rounded border p-2"
									/>
									<p className="font-bold">Match Maker Name:</p>
									<input
										type="text"
										placeholder="Match Maker Name"
										value={newMatchmaker.matchMakerName}
										onChange={handleMatchmakeNameChanges}
										className="rounded border p-2"
									/>
									<p className="font-bold">Match Maker Location:</p>
									<input
										type="text"
										placeholder="Match Maker Location"
										value={newMatchmaker.matchMakerLocation}
										onChange={handleMatchmakeLocationChanges}
										className="rounded border p-2"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<p className="font-bold">Match Maker Image URL:</p>
									<input
										type="text"
										value={newMatchmaker.imgUrl}
										placeholder="Match Maker Image Url"
										onChange={handleMatchmakeUrlChange}
										className="rounded border p-2"
									/>

									<p className="font-bold">Image Preview:</p>
									<Image
										alt="match maker"
										src={newMatchmaker.imgUrl || newMatchmaker.imgUrlPreview}
										width={100}
										height={100}
										className="max-w-[5rem] mx-auto"
										loading="lazy"
									/>
								</div>
							</div>
							<button
								type="button"
								className="border border-black py-2 px-3 bg-green-600 hover:bg-green-400 text-white rounded"
								onClick={handleAddMatchmaker}
							>
								Add
							</button>
						</div>
					</div>

					{newsLetter.length > 0 ? (
						newsLetter.map((newsLetterItem, index) => (
							<div key={newsLetterItem.id || `newsLetter-${index}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3 justify-center py-2">
								{newsLetterItem.matchMakeimages?.map((image, imageIndex) => (
									<div key={image.id || `image-${imageIndex}`} className="flex flex-col items-center gap-3 p-2 border border-yellow-400 rounded-xl">

										<p className="font-bold">Matchmaker: {image.id}</p>
										<p className="font-bold">Email Value:</p>
										<input
											type="text"
											value={image.email}
											onChange={(e) =>
												handleMatchmakeEmailEdit(index, imageIndex, e.target.value)
											}
											className="p-2 border rounded italic"
										/>
										<p className="font-bold">Name Value:</p>
										<input
											type="text"
											value={image.matchMakerName}
											onChange={(e) =>
												handleMatchmakeNameEdit(index, imageIndex, e.target.value)
											}
											className="p-2 border rounded italic"
										/>
										<p className="font-bold">Location Value:</p>
										<input
											type="text"
											value={image.matchMakerLocation}
											onChange={(e) =>
												handleMatchmakeLocationEdit(index, imageIndex, e.target.value)
											}
											className="p-2 border rounded italic"
										/>

										<p className="font-bold">Image URL Value:</p>
										<input
											type="text"
											value={image.imgUrl}
											onChange={(e) =>
												handleMatchmakeImageChange(index, imageIndex, e.target.value)
											}
											className="p-2 border rounded italic"
										/>
										<p className="font-bold">Image Preview:</p>
										<Image
											alt="match maker"
											src={image.imgUrl || image.imgUrlPreview}
											width={100}
											height={100}
											className="max-w-[6rem]"
											loading="lazy"
										/>
										{/* Delete */}
										<div>
											<button
												type="button"
												className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
												onClick={() => handleDeleteMatchmaker(newsLetterItem.id, image.id)}
											>
												Delete
											</button>

										</div>

									</div>
								))}
							</div>
						))
					) : (
						<p>Loading NewsLetter Matchmaker Images & Emails...</p>
					)}

					{/* Save Button */}
					<div className="pt-2 text-center">
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400"
						>
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>
				</div>

				{/* Pricing Section */}
				< div className="py-3 px-2 border rounded-xl text-sm bg-red-50 max-h-[46rem] overflow-auto">
					<h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ Pricing Section</span></h2>
					{
						pricing.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
								{pricing.map((item) => (
									<div key={item.id} className="py-2">
										<Accordion type="single" collapsible>
											<div className="p-2 border border-red-500 rounded-xl">
												<div className="text-center">
													<p className="text-sm font-bold ">
														Pricing Card - {item.id}
													</p>
												</div>
												<div className="flex flex-col gap-2">
													<label className="font-bold" htmlFor="title">
														Title:
													</label>
													<input
														type="text"
														value={item.title}
														onChange={(e) => handleTitleChange(item.id, e.target.value)}
														className="border p-2 rounded italic"
													/>


													<label className="font-bold" htmlFor="price">
														Price:
													</label>
													<input
														type="text"
														value={item.price}
														onChange={(e) => handlePriceChange(item.id, e.target.value)}
														className="border p-2 rounded italic"
													/>


													<label className="font-bold" htmlFor="btn-text">
														Btn-Text:
													</label>
													<input
														type="text"
														value={item.buttonText}
														onChange={(e) => handleButtonTextChange(item.id, e.target.value)}
														className="border p-2 rounded italic"
													/>


													<label className="font-bold" htmlFor="btn-text">
														Btn-Url:
													</label>
													<input
														type="text"
														value={item.btnUrl}
														onChange={(e) => handleButtonUrlChange(item.id, e.target.value)}
														className="border p-2 rounded italic"
													/>


													<label className="font-bold" htmlFor="btn-text">
														View more URL:
													</label>
													<input
														type="text"
														value={item.viewMoreUrl}
														onChange={(e) => handleViewMoreUrlChange(item.id, e.target.value)}
														className="border p-2 rounded italic"
													/>
												</div>
												<AccordionItem value="details">
													<AccordionTrigger className="justify-center">
														Edit details here
													</AccordionTrigger>
													<AccordionContent>
														<div>
															<ul className="flex flex-col gap-3 items-center text-start justify-start bg-white border border-gray-300 p-3 rounded-xl">
																{item.details?.map((detail) => (
																	<li key={detail.id} className="flex flex-col gap-1">
																		<textarea
																			cols={30}
																			rows={3}
																			value={detail.paragraph}
																			onChange={(e) =>
																				handleDetailsParagraphChange(item.id, detail.id, e.target.value)
																			}
																			className="bg-transparent border p-2 italic"
																		/>
																		{/* Delete */}
																		<button
																			type="button"
																			className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
																			onClick={() => handleDeleteDetail(item.id, detail.id)}
																		>
																			Delete
																		</button>
																	</li>
																))}
															</ul>

															{/* Add New Detail Section */}
															<div className="flex flex-col gap-1 justify-start py-2">
																<input
																	type="text"
																	value={newDetailInput}
																	onChange={(e) => setNewDetailInput(e.target.value)}
																	placeholder="Add new detail"
																	className="border p-2 rounded"
																/>
																<button
																	type="button"
																	onClick={() => handleAddDetail(item.id)}
																	className="ml-2 border border-black bg-green-600 hover:bg-green-400 text-white p-2 rounded"
																>
																	Add Detail
																</button>

															</div>
														</div>
													</AccordionContent>
												</AccordionItem>
											</div>
										</Accordion>
									</div>
								))}
							</div>
						) : (
							<p>Loading Pricing...</p>
						)
					}
					{/* Save Button */}
					< div className="pt-2 text-center" >
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400"
						>
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>
				</div>


				{/* Executive Plan Section */}
				<div className="my-3 p-2 border rounded-xl text-sm bg-green-50 max-h-[46rem] overflow-auto">
					<h2 className="text-xl md:text-3xl font-bold mb-2 inline-flex gap-5">
						<span className="underline">Edit ➡ Executive Plan and Services Section</span>
					</h2>
					<div className="flex flex-col lg:flex-row gap-5 justify-center">
						{/* Execu left */}
						<div>
							{executive.length > 0 && executive[0].executiveImg ? (
								executive.map((execItem, execuIndex) =>
									execItem.executiveImg?.map((img) => (
										<div
											key={img.id}
											className="flex flex-col items-center gap-2 p-2 rounded-xl border border-green-600"
										>
											<label className="font-bold" htmlFor="Exec img Title">
												Card Title:
											</label>
											<input
												type="text"
												value={img.execTitle}
												onChange={(e) =>
													handleExecuTitleChange(
														execuIndex,
														img.id,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>
											<p className="text-center font-bold">Card URL:</p>
											<input
												type="text"
												value={img.execUrl}
												onChange={(e) =>
													handleExecuUrlChange(
														execuIndex,
														img.id,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>
											<label className="font-bold" htmlFor="Exec img Title">
												Details Text:
											</label>
											<textarea
												cols={35}
												rows={3}
												value={img.execTxt}
												onChange={(e) =>
													handleExecuTextChange(
														execuIndex,
														img.id,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>
											<label className="font-bold" htmlFor="Execimage">
												Image URL Value:
											</label>
											<input
												type="text"
												value={img.execImg}
												onChange={(e) =>
													handleExecuImageChange(
														execuIndex,
														img.id,
														e.target.value,
													)
												}
												className="border p-2 rounded italic"
											/>

											<p className="font-bold">Image Preview:</p>
											<Image
												src={img.execImg || img.execImgPreview}
												width={100}
												height={100}
												alt="Execu Image"
												loading="lazy"
												className="rounded-xl"
											/>
										</div>
									)),
								)
							) : (
								<p>Loading Executive Image items...</p>
							)}
						</div>
						{/* Execu Right */}
						<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center gap-4">
							{executive.length > 0 && executive[0].cardsExec ? (
								executive.map((execItem, execuIndex) =>
									execItem.cardsExec?.map((card) => (
										<div key={card.id} className="">
											<div className="flex flex-col items-center gap-1 p-2 border border-green-600 rounded-xl">
												<p className="font-bold">
													Execu Plan Card - {card.id}{" "}
												</p>
												<label className="font-bold" htmlFor="execu card text">
													Card Text:
												</label>
												<input
													type="text"
													value={card.cardTextExec}
													onChange={(e) =>
														handleExecuCardTextChange(
															execuIndex,
															card.id,
															e.target.value,
														)
													}
													className="p-2 border rounded-xl italic"
												/>
												<p className="text-center font-bold">Card URL:</p>
												<input
													type="text"
													value={card.cardUrlExec}
													onChange={(e) =>
														handleExecuCardUrlChange(
															execuIndex,
															card.id,
															e.target.value,
														)
													}
													className="p-2 border rounded-xl italic"
												/>
												<label className="font-bold" htmlFor="execu card img">
													Image URL Value:
												</label>
												<input
													type="text"
													value={card.cardImgExec}
													onChange={(e) =>
														handleExecuCardImgChange(
															execuIndex,
															card.id,
															e.target.value,
														)
													}
													className="p-2 border rounded-xl italic"
												/>
												<p className="font-bold">Image preview:</p>
												<Image
													src={card.cardImgExec || card.cardImgExecPreview}
													width={100}
													height={100}
													alt="Execu Card Image"
													loading="lazy"
													className="rounded-xl"
												/>
											</div>
										</div>
									)),
								)
							) : (
								<p>Loading Executive Image items...</p>
							)}
						</div>
					</div>
					{/* Save Button */}
					<div className="pt-2 text-center">
						<button
							type="button"
							onClick={saveAllData}
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
								Save Changes
							</span>
						</button>
					</div>
				</div>

				{/* HOMEPAGE EDITOR FOOTER */}
				<div className="bg-black py-10 text-center text-5xl font-bold border rounded-2xl shrink inline-flex justify-center">
					<span className="text-green-500 animate-bounce md:block hidden">*🟢*</span> {""}
					<span className="text-yellow-500 animate-spin md:block hidden">*🟡*</span> {""}
					<span className="text-red-500 animate-bounce">*🔴*</span> {""}
					<span className="text-green-500 animate-spin">*🟢*</span> {""}
					<span className="text-yellow-500 animate-bounce">*🟡*</span> {""}
					<span className="text-red-500 animate-spin md:block hidden">*🔴*</span> {""}
					<span className="text-green-500 animate-bounce md:block hidden">*🟢*</span> {""}
					<span className="text-yellow-500 animate-spin md:block hidden">*🟡*</span> {""}
					<span className="text-red-500 animate-bounce md:block hidden">*🔴*</span> {""}
				</div>

			</div >
		</>
	);
}

export default HomePageCrud;