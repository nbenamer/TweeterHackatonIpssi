import { useEffect, useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");
	const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
	const [searchResults, setSearchResults] = useState([]); // State for search results
	const [isSearching, setIsSearching] = useState(false); // State to track search status
	const [hashtags, setHashtags] = useState([]);
	const [selectedHashtag, setSelectedHashtag] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false); // Pour contrôler l'affichage de la modale
	const [startDate, setStartDate] = useState(""); // Date de début
	const [endDate, setEndDate] = useState(""); // Date de fin

	const [selectedRange, setSelectedRange] = useState(null);


	const handleAdvancedSearch = async () => {
		setIsSearching(true);

		try {
			// Build the query string with all search parameters
			let queryParams = [];

			// Add keyword search if available
			if (searchKeyword.trim()) {
				queryParams.push(`keywords=${searchKeyword.trim()}`);
			}

			// Add date range if selected
			if (startDate) queryParams.push(`startDate=${startDate}`);
			if (endDate) queryParams.push(`endDate=${endDate}`);

			// Add sorting parameters (you could add UI controls for these later)
			queryParams.push(`sortBy=createdAt`);
			queryParams.push(`sortOrder=-1`);

			// Construct the full URL
			const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
			const url = `http://localhost:5000/api/posts/search${queryString}`;

			// Make the request
			const response = await fetch(url);
			const data = await response.json();

			if (response.ok) {
				setSearchResults(data.posts);
				console.log("Search results:", data.posts);
			} else {
				console.error("Error fetching search results:", data.error);
			}
		} catch (error) {
			console.error("Error during search:", error);
		} finally {
			setIsSearching(false);
		}
	};

	const applyDateRange = () => {
		if (startDate && endDate) {
			setSelectedRange(`${startDate} to ${endDate}`);
			setIsModalVisible(false); // Close the modal
			handleAdvancedSearch(); // Trigger search with the date range
		}
	};


	const fetchHashtags = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/posts/search/hashtags/popular`
			);
			const data = await response.json();
			if (response.ok) {
				setHashtags(data); // Mise à jour du state avec les hashtags récupérés
				console.log("result hashtags", data);
			} else {
				console.error(
					"Erreur lors de la récupération des hashtags:",
					data.error
				);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des hashtags:", error);
		}
	};

	useEffect(() => {
		fetchHashtags();
	}, []);

	// Fonction de gestion de la recherche
	const handleSearch = async () => {
		if (!searchKeyword.trim()) return; // Ne pas rechercher si le mot-clé est vide

		setIsSearching(true); // Mettre l'état de recherche à true

		try {
			// Récupérer les résultats de recherche depuis l'API
			const response = await fetch(
				`http://localhost:5000/api/posts/search?keywords=${searchKeyword}`
			);
			const data = await response.json();

			if (response.ok) {
				setSearchResults(data.posts); // Mettre à jour les résultats de recherche
				console.log("data result", data.posts);
			} else {
				console.error("Error fetching search results:", data.error);
			}
		} catch (error) {
			console.error("Error during search:", error);
		} finally {
			setIsSearching(false); // Réinitialiser l'état de recherche
		}
	};

	// Fonction pour afficher la modale
	const showModal = () => {
		setIsModalVisible(true);
	};

	// Fonction pour fermer la modale
	const handleCancel = () => {
		setIsModalVisible(false);
	};


	return (
		<>
			<div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-w-screen">
				{/* Header */}
				<div className="flex w-full border-b border-gray-700">
					<div
						className="flex justify-center flex-1 p-3 transition duration-300 cursor-pointer relative"
						onClick={() => setFeedType("forYou")} 
					>
						For you
						{feedType === "forYou" && (
							<div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" style={{ backgroundColor: '#05afdf', borderColor: '#05afdf'}}></div>
						)}
					</div>
					<div
						className="flex justify-center flex-1 p-3 transition duration-300 cursor-pointer relative"
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" style={{ backgroundColor: '#05afdf', borderColor: '#05afdf'}}></div>
						)}
					</div>
				</div>

				{/* SEARCH BAR */}
				<div className="flex items-center p-4 border-b border-gray-700">
					<input
						type="text"
						placeholder="Search posts..."
						className="flex-1 p-2 bg-transparent border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary"
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
					<button
						className="p-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition duration-300"
						style={{ backgroundColor: '#05afdf', borderColor: '#05afdf'}}
						onClick={handleSearch}
						disabled={isSearching}
					>
						{isSearching ? "Searching..." : "Search"}
					</button>
				</div>

				{/* "Advanced Search" button */}
				<div className="p-1 ml-4">
					<button
						onClick={showModal}
						className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
					>
						Advanced Search
					</button>
				</div>

				{/* MODAL */}
				{isModalVisible && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
							<h3 className="text-lg font-semibold mb-4 text-white">Advanced Search</h3>
							<div className="flex flex-col mb-4">
								<label className="text-sm mb-2 text-gray-300">Start Date</label>
								<input
									type="date"
									className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
								/>
							</div>
							<div className="flex flex-col mb-4">
								<label className="text-sm mb-2 text-gray-300">End Date</label>
								<input
									type="date"
									className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
								/>
							</div>
							<div className="flex justify-between">
								<button
									onClick={handleCancel}
									className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition duration-300"
								>
									Cancel
								</button>
								<button
									onClick={applyDateRange}
									className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				)}
				{selectedRange && (
					<div className="mb-4">
						<div className="flex items-center">
							<span className="mr-2 ml-5 ">{selectedRange}</span>
							<button
								onClick={() => setSelectedRange(null)}
								className=" text-red-500 p-1"
							>
								Clear
							</button>
						</div>
					</div>
				)}
				{/* ✅ Affichage des hashtags populaires après la barre de recherche */}
				<div className="mt-5">
					<h3 className="text-gray-300 text-sm mb-2 ml-5">Hashtags populaires :</h3>
					<div className="flex flex-wrap gap-2">
						{hashtags.length > 0 ? (
							hashtags.map((tag, index) => {
								const cleanHashtag = tag.hashtag.replace(/^#/, "");

								return (
									<span
										key={index}
										className={`ml-5 px-2 py-1 rounded-lg cursor-pointer transition duration-300 
                    						${selectedHashtag === cleanHashtag
												? "bg-blue-500 text-white"
												: "bg-gray-700 text-white hover:bg-primary"
											}`}
										onClick={() => {
											setSearchKeyword(cleanHashtag);
											setSelectedHashtag(cleanHashtag);
										}}
									>
										{tag.hashtag} ({tag.count})
									</span>
								);
							})
						) : (
							<p className="text-gray-500 ml-5" >Aucun hashtag populaire</p>
						)}
					</div>
				</div>

				{/* CREATE POST INPUT */}
				<CreatePost />

				{/* POSTS */}
				{searchResults.length > 0 ? (
					<Posts posts={searchResults} />
				) : (
					<Posts feedType={feedType} />
				)}
			</div>
		</>
	);
};

export default HomePage;
