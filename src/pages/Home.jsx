import React, { useState, useMemo } from 'react';
import Banner from '../components/Home/Banner';
import TagsSection from '../components/Home/TagsSection';
import AnnouncementsSection from '../components/Home/AnnouncementsSection';
import PostsSection from '../components/Home/PostsSection';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useTags from '../hooks/useTags';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTag, setCurrentTag] = useState(null);

  const { tags, isTagsLoading } = useTags();

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', page, currentTag],
    queryFn: async () => {
      const response = await axios.get(
        `/posts?limit=40&page=${page}${currentTag ? `&tag=${currentTag}` : ''}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const totalPages = postsData?.totalPages || 1;

  // 🧠 Filter posts on frontend
  const filteredPosts = useMemo(() => {
    const posts = postsData?.posts || [];
    const lowerSearch = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearch) ||
        post.authorName?.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, postsData]);

  const handlePageClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${page === i ? 'btn-active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isTagsLoading ? (
            <span className="flex w-full h-30 justify-center items-center py-4 text-primary">
              <Loader2 className="animate-spin" size={36} />
            </span>
          ) : (
            <TagsSection
              tags={tags}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
            />
          )}

          <AnnouncementsSection />

          {isLoading ? (
            <span className="flex justify-center items-center py-4 w-full h-30 text-primary">
              <Loader2 className="animate-spin" size={40} />
            </span>
          ) : (
            <>
              <PostsSection
                postsData={{ ...postsData, posts: filteredPosts }}
                setPage={setPage}
                currentPage={page}
              />

              {/* Pagination */}
              <div className="join flex justify-center mb-12 flex-wrap gap-2">
                <button
                  className="join-item btn"
                  onClick={() => handlePageClick(page - 1)}
                  disabled={page === 1}
                >
                  «
                </button>

                {renderPageButtons()}

                <button
                  className="join-item btn"
                  onClick={() => handlePageClick(page + 1)}
                  disabled={page === totalPages}
                >
                  »
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
