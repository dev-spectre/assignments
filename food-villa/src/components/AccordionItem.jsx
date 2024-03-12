/* eslint-disable react/prop-types */
function AccordionItem({ title, description, isVisible, setVisibleItem }) {
  return (
    <section className="px-3 py-2 outline outline-1 outline-stone-800">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold tracking-wider">{title}</h3>
        <button
          className="underline-offset-4 hover:font-semibold hover:underline"
          onClick={() => setVisibleItem(!isVisible && title.toLowerCase())}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      <p className="py-2">{isVisible && description}</p>
    </section>
  );
}

export default AccordionItem;
