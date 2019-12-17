import toaster from "../components/Toaster/Toastr";
const toastr = toaster;

export default (url, options) => {
    return fetch(url, options)
        .then(async response => {
            switch (response.status) {
                case 200: {
                    return await response.json();
                }
                case 401:
                case 404:
                case 409: {
                    const { title } = await response.json();

                    toastr.warning(title, "Error");
                    throw title;
                }
                default: {
                    const { title } = await response.json();

                    toastr.error(title, "Critical Error");
                    throw title;
                }
            }
        })
};