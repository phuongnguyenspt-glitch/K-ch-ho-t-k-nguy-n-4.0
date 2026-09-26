export interface Question {
  id: number;
  level: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Stage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  shardName: string;
  shardColor: string;
  shardIcon: string;
  targetPercent: number;
  activationText: string;
  knowledgeScope: string;
  visualKeywords: string[];
  districtName: string;
  districtDesc: string;
  questions: Question[];
}

export const GAME_STAGES: Stage[] = [
  {
    id: 1,
    slug: 'stage-1',
    title: 'CHẶNG 1: SỐ HÓA CUỘC SỐNG',
    subtitle: 'Ứng dụng CNTT trong đời sống kinh tế – xã hội',
    shardName: 'ỨNG DỤNG CNTT',
    shardColor: '#06b6d4', // Cyan
    shardIcon: 'Network',
    targetPercent: 33,
    activationText: 'ỨNG DỤNG CNTT – ACTIVATED!',
    knowledgeScope: 'Ứng dụng CNTT, vai trò & đóng góp của Tin học với kinh tế – xã hội, dịch vụ số.',
    visualKeywords: ['Trường học số', 'Bệnh viện điện tử', 'Ngân hàng số', 'Dịch vụ công trực tuyến'],
    districtName: 'Khu Đô Thị Số & Dịch Vụ Công Dân',
    districtDesc: 'Hệ thống trường học thông minh, bệnh viện số, thanh toán trực tuyến và chính phủ điện tử.',
    questions: [
      {
        id: 1,
        level: 'CÂU 1 – NHẬN BIẾT',
        question: 'Hoạt động nào sau đây là một ví dụ về ứng dụng công nghệ thông tin trong đời sống?',
        options: [
          { key: 'A', text: 'Thanh toán hóa đơn bằng ứng dụng ngân hàng trên điện thoại.' },
          { key: 'B', text: 'Viết nội dung vào vở bằng bút.' },
          { key: 'C', text: 'Tưới cây bằng bình tưới thông thường.' },
          { key: 'D', text: 'Đọc thông tin trên một tờ giấy in.' }
        ],
        correctAnswer: 'A',
        explanation: 'Ứng dụng ngân hàng sử dụng CNTT để xử lí và cung cấp các dịch vụ tài chính trên môi trường số.'
      },
      {
        id: 2,
        level: 'CÂU 2 – VẬN DỤNG',
        question: 'Một bệnh viện triển khai hệ thống đặt lịch khám trực tuyến, quản lí hồ sơ bệnh án điện tử và gửi kết quả xét nghiệm cho người bệnh qua hệ thống số. Ví dụ này cho thấy đóng góp nào của CNTT?',
        options: [
          { key: 'A', text: 'Chỉ làm tăng số lượng máy tính trong bệnh viện.' },
          { key: 'B', text: 'Hỗ trợ xử lí thông tin và nâng cao hiệu quả cung cấp dịch vụ.' },
          { key: 'C', text: 'Thay thế hoàn toàn bác sĩ.' },
          { key: 'D', text: 'Chỉ có tác dụng lưu trữ dữ liệu.' }
        ],
        correctAnswer: 'B',
        explanation: 'CNTT giúp thu thập, xử lí, lưu trữ và khai thác thông tin, qua đó nâng cao hiệu quả hoạt động và chất lượng dịch vụ.'
      }
    ]
  },
  {
    id: 2,
    slug: 'stage-2',
    title: 'CHẶNG 2: KHAI MỞ TRI THỨC',
    subtitle: 'Khai thác tri thức từ dữ liệu & Kinh tế tri thức',
    shardName: 'TRI THỨC SỐ',
    shardColor: '#38bdf8', // Sky / Cyan-Blue
    shardIcon: 'BrainCircuit',
    targetPercent: 66,
    activationText: 'TRI THỨC SỐ – ACTIVATED!',
    knowledgeScope: 'Xã hội tri thức, kinh tế tri thức, dữ liệu và khai thác tri thức từ dữ liệu.',
    visualKeywords: ['Kho dữ liệu lớn', 'Máy tính phân tích', 'Biểu đồ trực quan', 'Tri thức hữu ích'],
    districtName: 'Trung Tâm Dữ Liệu & Phân Tích Trí Tuệ',
    districtDesc: 'Hệ thống Data Center, máy chủ phân tích dữ liệu lớn và thuật toán hỗ trợ ra quyết định.',
    questions: [
      {
        id: 3,
        level: 'CÂU 3 – NHẬN BIẾT / THÔNG HIỂU',
        question: 'Trong nền kinh tế tri thức, yếu tố nào ngày càng giữ vai trò quan trọng đối với sự phát triển?',
        options: [
          { key: 'A', text: 'Chỉ số lượng máy móc.' },
          { key: 'B', text: 'Tri thức và khả năng khai thác, sử dụng tri thức.' },
          { key: 'C', text: 'Chỉ sức lao động cơ bắp.' },
          { key: 'D', text: 'Chỉ nguồn tài nguyên thiên nhiên.' }
        ],
        correctAnswer: 'B',
        explanation: 'Trong kinh tế tri thức, tri thức trở thành một nguồn lực quan trọng đối với sự phát triển.'
      },
      {
        id: 4,
        level: 'CÂU 4 – VẬN DỤNG',
        question: 'Một siêu thị thu thập dữ liệu về hàng nghìn giao dịch. Sau khi phân tích dữ liệu, hệ thống phát hiện sản phẩm nào được mua nhiều vào từng thời điểm để hỗ trợ người quản lí lập kế hoạch nhập hàng. Hoạt động này thể hiện rõ nhất:',
        options: [
          { key: 'A', text: 'Chỉ lưu trữ dữ liệu.' },
          { key: 'B', text: 'Khai thác tri thức từ dữ liệu để hỗ trợ ra quyết định.' },
          { key: 'C', text: 'Xóa dữ liệu không cần thiết.' },
          { key: 'D', text: 'Sao chép dữ liệu sang máy tính khác.' }
        ],
        correctAnswer: 'B',
        explanation: 'Dữ liệu sau khi được phân tích có thể giúp phát hiện thông tin và tri thức hữu ích phục vụ việc ra quyết định.'
      }
    ]
  },
  {
    id: 3,
    slug: 'stage-3',
    title: 'CHẶNG 3: KÍCH HOẠT CÔNG NGHIỆP 4.0',
    subtitle: 'Cách mạng công nghiệp 4.0, IoT & Máy móc thông minh',
    shardName: 'CÔNG NGHỆ 4.0',
    shardColor: '#fbbf24', // Amber Gold
    shardIcon: 'Cpu',
    targetPercent: 100,
    activationText: 'CÔNG NGHỆ 4.0 – ACTIVATED!',
    knowledgeScope: 'Thiết bị thông minh, CMCN lần thứ tư, Internet vạn vật (IoT), tự động hóa sản xuất.',
    visualKeywords: ['Cảm biến IoT', 'Cánh tay robot tự động', 'Nhà máy thông minh', 'Mạng kết nối vạn vật'],
    districtName: 'Tổ Hợp Công Nghiệp Thông Minh & IoT',
    districtDesc: 'Hệ thống dây chuyền tự động, cánh tay robot, cảm biến thông minh và mạng kết nối máy móc.',
    questions: [
      {
        id: 5,
        level: 'CÂU 5 – THÔNG HIỂU',
        question: 'Đặc điểm nào sau đây thể hiện rõ nhất một thiết bị thông minh?',
        options: [
          { key: 'A', text: 'Có hình thức hiện đại và màn hình đẹp.' },
          { key: 'B', text: 'Có khả năng thu thập, xử lí thông tin, kết nối và thực hiện một số hoạt động tự động.' },
          { key: 'C', text: 'Có kích thước nhỏ.' },
          { key: 'D', text: 'Chỉ cần sử dụng điện để hoạt động.' }
        ],
        correctAnswer: 'B',
        explanation: 'Thiết bị thông minh có khả năng xử lí thông tin, kết nối và thực hiện một số hoạt động tự động.'
      },
      {
        id: 6,
        level: 'CÂU 6 – VẬN DỤNG',
        question: 'Trong một nhà máy, các cảm biến liên tục thu thập dữ liệu từ máy móc. Các thiết bị được kết nối qua mạng, trao đổi dữ liệu và hệ thống có thể tự động điều chỉnh hoạt động khi phát hiện bất thường. Tình huống này thể hiện rõ nhất:',
        options: [
          { key: 'A', text: 'Máy móc chỉ được sử dụng để thay thế sức lao động.' },
          { key: 'B', text: 'Vai trò của IoT và máy móc thông minh trong Cách mạng công nghiệp lần thứ tư.' },
          { key: 'C', text: 'Internet chỉ được sử dụng để truyền hình ảnh.' },
          { key: 'D', text: 'Máy móc thông minh không cần xử lí dữ liệu.' }
        ],
        correctAnswer: 'B',
        explanation: 'IoT cho phép các thiết bị kết nối, thu thập và trao đổi dữ liệu; kết hợp với máy móc thông minh tạo nên các hệ thống sản xuất ngày càng tự động và thông minh.'
      }
    ]
  }
];

export const FINAL_MESSAGE = {
  headline: 'KÍCH HOẠT THÀNH CÔNG!',
  subhead: 'KỶ NGUYÊN 4.0',
  status: 'ALL SYSTEMS ONLINE',
  equation: [
    { name: 'ỨNG DỤNG CNTT', color: '#06b6d4' },
    { name: 'TRI THỨC SỐ', color: '#38bdf8' },
    { name: 'CÔNG NGHỆ 4.0', color: '#fbbf24' }
  ],
  motto: 'TIN HỌC KẾT NỐI TRI THỨC – CÔNG NGHỆ KIẾN TẠO TƯƠNG LAI.'
};
