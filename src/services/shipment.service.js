const TOKEN_API = process.env.REACT_APP_API_KEY_TOKEN;
const DOCUMENT_FORMAT = "pdf";

const INITIAL_VALUES = {
    origenData: {
        label: "",
        country: "",
        region: "",
        city: "",
        postcode: "",
    },
    destinyData: {
        label: "",
        country: "",
        region: "",
        city: "",
        postcode: "",
    },
    length: "",
    width: "",
    height: "",
    weight: "",
    totalOfPackages: "",
};

export const shipmentService = () => {
    const principal_url = "https://api-demo.skydropx.com/v1";


    const postCreateLabel = async (id) => {
        try {
            const bodyData = {
                rate_id: parseInt(id),
                label_format: DOCUMENT_FORMAT,
            }

            const fetchApi = await fetch(`${principal_url}/labels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token token=${TOKEN_API}`,
                },
                body: JSON.stringify(bodyData),
            }).then(response => response.json())
            return fetchApi;

        } catch (error) {
            return error;
        }
    }



    const postCreateShipment = async ({ weight, height, width, length, origenData, destinyData, totalOfPackages }) => {
        const bodyData =
        {
            address_from: {
                province: "Azcapotzalco",
                name: "Jose Fernando",
                city: origenData?.city,
                zip: origenData?.postcode,
                country: "MX",
                address1: "Av. Principal #234",
                company: "skydropx",
                address2: "Centro",
                phone: "5555555555",
                email: "skydropx@email.com"
            },
            parcels: [
                {
                    weight,
                    height,
                    width,
                    length,
                    distance_unit: "CM",
                    mass_unit: "KG",
                }
            ],
            address_to: {
                province: "Jalisco",
                name: "Jorge Fernández",
                city: destinyData?.city,
                zip: destinyData?.postcode,
                country: "MX",
                address1: "Av. Lázaro Cárdenas #234",
                company: "-",
                address2: "Americana",
                phone: "5555555555",
                email: "ejemplo@skydropx.com",
                reference: "Frente a tienda de abarro",
                contents: "ASDASD"
            },
            consignment_note_class_code: "53131600",
            consignment_note_packaging_code: "1H1"
        };

        const getData = await fetch(`${principal_url}/shipments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token token=${TOKEN_API}`,
            },
            body: JSON.stringify(bodyData),
        })
            .then(response => response.json())

        // const dataReturn = fetchApi().then(res => console.log(res.data));
        return getData;
    }

    return {
        postCreateLabel,
        postCreateShipment,
        INITIAL_VALUES
    }
}