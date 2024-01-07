import proxy from "./proxy";
import crypto from "../../data/crypto.json";
import './styles/index.css';

/**
 * The entry point for the Widget.
 *
 * @return {HTMLElement} The created widget element.
 *
 * @description
 * NOTE: The `addNetWorth` is the parent function for the `addLevelImage`.
 */
const Widget = (): HTMLElement => {
    const WIDGET = document.createElement('div');
    WIDGET.style.cssText = `
        display: flex;
        pointer-events: none;
        user-select: none;
        flex-direction: column;
        justify-content: center;
    `;
    WidgetBackground(WIDGET);
    Settings(WIDGET);
    NetWorth(WIDGET);
    return WIDGET;
}

const WidgetBackground = (widget: HTMLElement) => {
    const WIDGET_IMAGE_SOURCE = require("./assets/misc/widget.svg") as string;
    const WIDGET_IMAGE = document.createElement('img');
    WIDGET_IMAGE.src = WIDGET_IMAGE_SOURCE;
    widget.appendChild(WIDGET_IMAGE);
}
/**
 * Adds a settings icon to the specified widget.
 * @description
 * The `ondragstart` event is set to `false` to disable dragging of the settings icon.
 */
const Settings = (widget: HTMLElement) => {
    const SETTINGS_IMAGE_SOURCE = require("./assets/misc/settings.svg") as string;
    const SETTINGS_IMAGE = document.createElement('img');
    SETTINGS_IMAGE.src = SETTINGS_IMAGE_SOURCE;
    SETTINGS_IMAGE.ondragstart = () => false;
    SETTINGS_IMAGE.style.cssText = `
        position: absolute;
        width: 20px;
        right: 5px;
        top: 5px;
        cursor: pointer;
        pointer-events: auto;
    `;
    widget.appendChild(SETTINGS_IMAGE);
}
/**
 * Adds a level image to the specified widget based on the net worth amount.
 *
 * @param {HTMLElement} widget - The widget to which the level image will be added.
 * @param {number} netWorth - The net worth amount used to determine the level image.
 * @return {void} This function does not return anything.
 *
 * @description
 * This function creates an `img` element to display a level image and appends it to the specified widget.
 * The image source is set dynamically based on the level using the `require` function.
 * The image element is positioned absolutely within the widget.
 * 
 * NOTE: dependent on the `NETWORTH` element being present
 */
const LevelImage = (widget: HTMLElement, netWorth: number): void => {
    const IMAGE_DIR = "./assets/level/";
    const LEVEL_IMAGE = document.createElement('img');
    LEVEL_IMAGE.style.cssText = `
        position: absolute;
        margin-left: 33px;
    `;
    switch(true) {
        case netWorth >= 1000000:
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level6.png`) as string;
            break;
        case netWorth >= 100000:
            LEVEL_IMAGE.style.marginLeft = "36px";
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level5.png`) as string;
            break;
        case netWorth >= 10000:
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level4.png`) as string;
            break;
        case netWorth >= 1000:
            LEVEL_IMAGE.style.marginLeft = "36px";
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level3.png`) as string;
            break;
        case netWorth >= 100:
            LEVEL_IMAGE.style.marginLeft = "36px";
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level2.png`) as string;
            break;
        case netWorth >= 10:
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level1.png`) as string;
            break;
        default:
            LEVEL_IMAGE.src = require(`${IMAGE_DIR}level0.png`) as string;
    }
    widget.appendChild(LEVEL_IMAGE);
}
/**
 * Generates a net worth display and adds it to the specified widget.
 *
 * @param {HTMLElement} widget - The widget to which the net worth display will be added.
 * @return {void} This function does not return anything.
 *
 * @description
 * This function creates a new div element to display the net worth and appends it to the specified widget.
 * The net worth is calculated based on the provided totalAmount.
 * The net worth value is formatted and displayed using different units (T, B, MIL, K) depending on its magnitude.
 * If the net worth is less than 1000, it is displayed as a decimal.
 * The net worth display is created as a text node and added as a child to the NETWORTH div element.
 * Finally, the addLevelImage function is called to add an image to the widget based on the net worth amount.
 */
const NetWorth = async (widget: HTMLElement): Promise<void> => {
    const NETWORTH = document.createElement('div');
    NETWORTH.style.cssText = `
        position: absolute;
        margin-left: 150px;
        font-size: 25px;
        font-family: Consolas;
    `;
    const totalAmountRaw: any = await calculateNetWorth();
    let netWorthAmount = String(totalAmountRaw).split(".");
    let netWorthWholeAmount = netWorthAmount[0];
    const netWorthDecimalAmount: string = netWorthAmount.length > 1 ? netWorthAmount[1].padEnd(2, "0") : "00";
    switch(true) {
        case totalAmountRaw >= 1000000000000:
            netWorthWholeAmount = netWorthWholeAmount.slice(0, -12);
            NETWORTH.innerText = `$${netWorthWholeAmount}T`;
            break;
        case totalAmountRaw >= 1000000000:
            netWorthWholeAmount = netWorthWholeAmount.slice(0, -9);
            NETWORTH.innerText = `$${netWorthWholeAmount}B`;
            break;
        case totalAmountRaw >= 1000000:
            netWorthWholeAmount = netWorthWholeAmount.slice(0, -6);
            NETWORTH.innerText = `$${netWorthWholeAmount}MIL`;
            break;
        case totalAmountRaw >= 1000:
            netWorthWholeAmount = netWorthWholeAmount.slice(0, -3);
            NETWORTH.innerText = `$${netWorthWholeAmount}K`;
            break;
        default:
            NETWORTH.innerText = `$${netWorthWholeAmount}.${netWorthDecimalAmount}`;
            break;
    }
    widget.appendChild(NETWORTH);
    LevelImage(widget, totalAmountRaw);
}
/**
 * Calculates the total value of all types of assets
 *
 * @return {Promise<number>} A promise that resolves to the total value of assets.
 *
 * @description
 * This function iterates over each asset in the crypto JSON file
 * and retrieves the wallet balance along with the token(s) balance if applicable.
 */
const getTotalAssetsValue = async (): Promise<number> => {
    try {
        let totalAssetsValue = 0;
        // Get crypto assets total value
        for (const asset of crypto.assets) {
            // Allow multiple addresses (primarily for bitcoin)
            const address = asset.address.join("|");
            const walletEndpoint = `/api/v1/crypto/${asset.blockchain}/wallet?address=${address}`;
            // Get wallet balance
            const response = await proxy.get(walletEndpoint);
            totalAssetsValue += response.data.balance;
            // Get token balance if applicable
            if(asset.tokens.length > 0) {
                for (const token of asset.tokens) {
                    const tokenEndpoint = `${walletEndpoint}&contractaddress=${token.contract}&tokenid=${token.name}`;
                    const response = await proxy.get(tokenEndpoint);
                    totalAssetsValue += response.data.balance;
                }
            }
        }
        // TODO... other assets
        return totalAssetsValue;
    } catch (error) {
        console.error('Error reading JSON file or fetching data:', error.message);
    }
}

const calculateNetWorth = async (): Promise<number> => {
    const totalAssetsValue = await getTotalAssetsValue();
    const totalDebtValue = 0;
    return Number((totalAssetsValue - totalDebtValue).toFixed(2));
}

document.body.appendChild(Widget());