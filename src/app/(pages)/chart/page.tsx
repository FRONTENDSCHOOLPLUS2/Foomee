import { BackArrowIcon } from '@/components/icons/IconComponents';
import BottomNav from '@/components/layout/BottomNav';

const ChartPage = () => {
  return (
    <main className="flex-col justify-center min-h-screen h-full bg-white">
      <header className="text-center relative w-full h-12 px-8 py-4">
        <h1 className="font-semibold text-xl">통계 페이지입니다.</h1>
        <button className="absolute left-6 top-4">
          <BackArrowIcon />
        </button>
      </header>
      <section className="py-2.5 px-8 flex flex-col gap-16 relative w-full pt-8 h-full min-h-without-header-tab"></section>

      <BottomNav />
    </main>
  );
};

export default ChartPage;
