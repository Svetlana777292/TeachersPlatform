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

export interface Card {
    id: number;
    user_id: number;
    brand: string;
    last_numbers: string;
    exp_month: number;
    exp_year: number;
    is_default: boolean;
    created_at: string;
}

export interface Transaction {
    id: number;
    user_id: number;
    type: string;
    amount: number;
    status: string;
    crated_at: string;
    updated_at: string;
}