export default function card({ name, description, socialMediaHandles, interests }) {
  return (
    <article className="card">
      <section>
        <h2 className="card__name">{name}</h2>
        <p className="card__description">{description}</p>
      </section>
      <section>
        <h2>Interests</h2>
        <div className="card__interests">
          {interests.map((interest) => (
            <p>{interest}</p>
          ))}
        </div>
      </section>
      <section className="card__social-media-handles">
        {socialMediaHandles.map((handle) => (
          <a href={handle.link} className="card__btn" target="blank">
            {handle.title || handle.link}
          </a>
        ))}
      </section>
    </article>
  );
}
