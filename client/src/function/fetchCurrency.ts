export const fetchCurrency = async () => {
  try {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_API_KEY_LOCATION}`
    );
    const data = await response.json();
    const currency = data.currency;
    return currency;
  } catch (error) {
    console.error("Error:", error);
    return null; // return null or handle the error as needed
  }
};
