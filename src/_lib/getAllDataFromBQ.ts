type MediaLogoImage = {
	page_id: string;
	folder_name: string;
	files: string;
};

export async function getAllDataFromBQ() {
    try {
        if (!process.env.NEXTAUTH_URL) {
            console.warn("NEXTAUTH_URL is missing. Returning fallback data.");
            return [
              {
                page_id: "default",
                folder_name: "fallback-folder",
                files: "fallback-file.jpg",
              },
            ]; // ✅ Fallback response
          }
        const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/configuration/media-logo-banner`,
            { next: { revalidate: 3600 } },
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MediaLogoImage[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        return [];
    }
}