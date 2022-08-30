
import PSFour from "../images/PS4.png";
import PC from "../images/PC.png";
import XBox from "../images/XBOX.png";
import Switch from "../images/SWITCH.png";
import {Platform} from "../types";
export const getPlatformIcon = (platform: Platform) => {
    let icon;
    switch (platform) {
        case 'PC':
            icon = PC;
            break;
        case 'PS4':
            icon = PSFour;
            break;
        case 'XBOX':
            icon = XBox;
            break;
        case 'SWITCH':
            icon = Switch;
            break;
        default:
            icon = PC;
            break;
    }
    return icon;
}