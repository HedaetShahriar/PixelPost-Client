import { Search } from "lucide-react";

const Banner = ({ setSearchTerm }) => {
  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="relative min-h-[420px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 bg-base-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23403944' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%239C8F9C'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Slight overlay for readability */}
      <div className="absolute inset-0 bg-base-100/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
          Join The Conversation
        </h1>
        <p className="text-lg sm:text-xl text-base-content/70">
          Explore topics, share your ideas, and connect with a community of
          creators and thinkers. Search for posts by author or title below.
        </p>

        {/* Search Input */}
        <div className="relative w-full max-w-xl mx-auto">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search by author or title"
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition shadow"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
