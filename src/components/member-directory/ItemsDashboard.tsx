"use client";
import ItemDashboard from "./ItemDashboard";

interface Item {
  name: string;
  path: string;
  icon: React.ReactNode;
  tag?: number;
  onClick?: () => void;
}

interface ItemsDashboardProps {
  item: {
    title: string;
    items: Item[];
  };
}

const ItemsDashboard: React.FC<ItemsDashboardProps> = ({ item }) => {
  const { title, items } = item;

  return (
    <>
      <h5 className="text-sm leading-[1] font-semibold uppercase text-muted dark:text-muted-foreground bg-muted-foreground dark:bg-background p-2 pb-1 mt-5 mb-2.5 tracking-[0.5px]">
        {title}
      </h5>
      <ul>
        {items?.map((item, idx) => (
          <ItemDashboard key={idx} item={item} />
        ))}
      </ul>
    </>
  );
};

export default ItemsDashboard;
