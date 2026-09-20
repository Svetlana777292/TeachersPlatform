export interface Lesson {
    id: number;
    topic: string;
    date: string;
    duration: number;
    card_color: string;

    student_id: number;
    teacher_id: number;

    price: number;
    is_paid: boolean;

    isSplit?: boolean;
    splitPart?: number;
    originalLesson?: Lesson;
}

export type LessonsByDate = Record<string, Lesson[]>