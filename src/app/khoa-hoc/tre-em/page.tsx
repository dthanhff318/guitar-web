import type { Metadata } from "next";

import { CourseBlock, CourseLayout } from "@/components/ui/CourseLayout";

export const metadata: Metadata = {
  title: "Lớp Guitar trẻ em (6 – 15 tuổi) | Trung Hieu Guitar Center",
  description:
    "Giáo trình guitar dành cho trẻ từ 6 đến 15 tuổi, từ những bước làm quen đầu tiên đến khi bé tự tin chơi trọn vẹn một bài hát.",
};

const CURRICULUM = [
  "Làm quen với cấu tạo và cách sử dụng guitar.",
  "Tư thế ngồi, cách cầm đàn và kỹ thuật bấm dây đúng.",
  "Các hợp âm và cách chuyển hợp âm.",
  "Nhịp, tiết tấu và kỹ thuật đệm hát cơ bản.",
  "Luyện tập qua các bài hát phù hợp với độ tuổi.",
  "Phát triển khả năng cảm âm và giữ nhịp.",
  "Từng bước nâng cao kỹ thuật theo khả năng của từng học viên.",
  "Hướng dẫn phương pháp tự luyện tập tại nhà.",
];

export default function ChildrenCoursePage() {
  return (
    <CourseLayout eyebrow="Dành cho trẻ em" title="Lớp Guitar trẻ em (6 – 15 tuổi)">
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          Tại Trung tâm Guitar Trung Hiếu, giáo trình được xây dựng dành cho các
          bé từ những bước đầu tiên làm quen với guitar đến khi có thể tự tin
          chơi những bài hát phù hợp với khả năng của mình.
        </p>
        <p>
          Trong quá trình học, giáo viên sẽ hướng dẫn trực tiếp và chỉnh sửa cho
          từng học viên về tư thế ngồi, cách cầm đàn, bấm dây, chuyển hợp âm,
          giữ nhịp và các kỹ thuật chơi guitar cơ bản. Nội dung học được điều
          chỉnh theo độ tuổi, khả năng tiếp thu và mục tiêu của từng bé để việc
          học đạt hiệu quả tốt nhất.
        </p>
        <p>
          Bên cạnh việc luyện kỹ thuật, các bé sẽ được thực hành thông qua những
          bài hát phù hợp với lứa tuổi. Qua từng buổi học, bé được củng cố kiến
          thức cũ, học thêm kỹ thuật mới và có thời gian thực hành để hình thành
          thói quen tự luyện tập tại nhà.
        </p>
        <p>
          Lớp học phù hợp với cả những bé chưa từng tiếp xúc với guitar và những
          bé đã biết chơi cơ bản nhưng muốn được hướng dẫn bài bản hơn.
        </p>
      </div>

      <CourseBlock heading="Nội dung học">
        <ul className="space-y-2.5">
          {CURRICULUM.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CourseBlock>

      <CourseBlock heading="Hình thức học">
        <p>
          Các lớp được tổ chức với số lượng học viên phù hợp để giáo viên có thể
          theo sát quá trình học của từng bé, kịp thời sửa những lỗi về tư thế và
          kỹ thuật ngay trong buổi học.
        </p>
        <p>
          Phụ huynh có thể lựa chọn lớp nhóm hoặc lớp 1-1 tùy theo nhu cầu và
          mục tiêu học tập của bé.
        </p>
      </CourseBlock>
    </CourseLayout>
  );
}
