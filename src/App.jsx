import { useEffect, useRef } from "react";
import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";
import BootStrapModal from "./components/BootStrapModal";
import { Offcanvas } from ".components/OffCanvas";
import { Menu } from "lucide-react";

function App() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("gridData")) {
      const mockData = [
        { name: "홍길동", age: 29, job: "개발자", address: "서울" },
        { name: "김철수", age: 35, job: "디자이너", address: "대구" },
        { name: "이영희", age: 42, job: "기획자", address: "인천" },
        { name: "박영수", age: 31, job: "마케터", address: "부산" },
      ];
      localStorage.setItem("gridData", JSON.stringify(mockData));
    }

    const savedData = JSON.parse(localStorage.getItem("gridData")) || [];

    const grid = new Grid({
      el: gridRef.current,
      scrollX: false,
      scrollY: false,
      bodyHeight: 300,
      columns: [
        { header: "이름", name: "name", sortingType: "desc", sortable: true },
        { header: "나이", name: "age", sortingType: "desc", sortable: true },
        { header: "직업", name: "job" },
        { header: "주소", name: "address" },
      ],
      data: savedData,
    });

    return () => grid.destroy();
  }, []);

  return (
    <div className="p-10">
      {/* ✅ 상단 헤더 */}
      <div className="w-full flex justify-between items-center mb-3">
        {/* 좌측: 햄버거 메뉴 */}
        <OffCanvas buttonLabel={<Menu size={24} />} title="사이드 메뉴">
          <ul className="list-disc pl-4">
            <li>대시보드</li>
            <li>회원 관리</li>
            <li>설정</li>
          </ul>
        </OffCanvas>

        {/* 가운데: 제목 */}
        <h1 className="text-xl font-bold">회원 목록</h1>

        {/* 우측: 회원정보 입력 버튼 */}
        <BootStrapModal buttonLabel="회원정보입력" />
      </div>

      {/* ✅ Grid */}
      <div
        ref={gridRef}
        className="w-full h-[400px] border rounded-lg shadow-lg bg-white"
      />
    </div>
  );
}

export default App;
