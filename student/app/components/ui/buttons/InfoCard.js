import styles from "./infoCard.module.css";
import Card from "@/app/components/ui/Card";
import DynamicIcon from "@/app/components/ui/icon/Dynamic";

export function InfoCardButton({
    theme = "primary",
    text,
    icon,
    textWidth = .5,
    borderRadius = 16,
}) {
    const style = {
        "--border-radius": `${borderRadius}px`,
        "--text-width": `${textWidth * 100}%`,
    };

    return (
        <div className={styles["info-card-container"]} style={style}>
            <div className={styles["hover"]}></div>
            <div className={styles["card"]}>
                <Card theme={theme} borderRadius={borderRadius} border transparent>
                    <div className={styles["card-content-container"]}>
                        <div className={`${styles["text"]} ko-sb-20`}>{text}</div>
                        <div className={styles["icon"]}><DynamicIcon icon={icon} size={40} /></div>
                    </div>
                </Card>
            </div>
        </div>
    );
}