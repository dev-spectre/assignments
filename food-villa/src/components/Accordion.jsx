import { useState } from "react";
import AccordionItem from "./AccordionItem";

function Accordion() {
  const [visibleItem, setVisibleItem] = useState();

  return (
    <article className="my-2 shadow">
      <AccordionItem
        title={"Team"}
        isVisible={visibleItem === "team"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi magnam odio placeat nemo atque nulla omnis dolor molestias impedit laborum aliquid, error nihil rem! Assumenda quisquam ab et aut hic modi perspiciatis tempora molestiae blanditiis quia, facilis necessitatibus quos autem, laboriosam alias itaque ut praesentium voluptatum id in? Omnis."
        }
        setVisibleItem={setVisibleItem}
      />
      <AccordionItem
        title={"Career"}
        isVisible={visibleItem === "career"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi magnam odio placeat nemo atque nulla omnis dolor molestias impedit laborum aliquid, error nihil rem! Assumenda quisquam ab et aut hic modi perspiciatis tempora molestiae blanditiis quia, facilis necessitatibus quos autem, laboriosam alias itaque ut praesentium voluptatum id in? Omnis."
        }
        setVisibleItem={setVisibleItem}
      />
      <AccordionItem
        title={"Details"}
        isVisible={visibleItem === "details"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi magnam odio placeat nemo atque nulla omnis dolor molestias impedit laborum aliquid, error nihil rem! Assumenda quisquam ab et aut hic modi perspiciatis tempora molestiae blanditiis quia, facilis necessitatibus quos autem, laboriosam alias itaque ut praesentium voluptatum id in? Omnis."
        }
        setVisibleItem={setVisibleItem}
      />
      <AccordionItem
        title={"Products"}
        isVisible={visibleItem === "products"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi magnam odio placeat nemo atque nulla omnis dolor molestias impedit laborum aliquid, error nihil rem! Assumenda quisquam ab et aut hic modi perspiciatis tempora molestiae blanditiis quia, facilis necessitatibus quos autem, laboriosam alias itaque ut praesentium voluptatum id in? Omnis."
        }
        setVisibleItem={setVisibleItem}
      />
    </article>
  );
}

export default Accordion;
