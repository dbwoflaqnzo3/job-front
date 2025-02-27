import { useMemo } from "react";
import dynamic from "next/dynamic";

const BASE_ICON_SIZE = 34;

const getIconComponent = (icon) => {
  if (!icon) return null;
  return dynamic(() => import(`@/public/assets/images/icons/${icon}.svg`).then((mod) => mod.default));
};


export const DynamicIcon = ({icon, size = BASE_ICON_SIZE}) => {
  const IconComponent = useMemo(() => icon ? getIconComponent(icon) : null, [icon]);
  
  const scale = size / BASE_ICON_SIZE;
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: `scale(${scale})`,
    transformOrigin: "50% 50%",
  };
  return (
    <div style={style}>{IconComponent && <IconComponent />}</div>
  );
};

export default DynamicIcon;