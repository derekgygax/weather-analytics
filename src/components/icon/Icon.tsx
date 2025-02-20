
// styles
import styles from './Icon.module.scss';

// icons
import searchIcon from '@/public/icons/search.svg';

const icons: Record<string, string> = {
  search: searchIcon,
};

interface IconProps {
  id: string;
  alt: string;
  tooltip: string;
}

export const Icon = ({ id, alt, tooltip }: IconProps) => {

  return (
    <div title={tooltip}>
      <img
        alt={alt}
        src={icons[id]}
        className={styles.icon}
      />
    </div>
  )
}
