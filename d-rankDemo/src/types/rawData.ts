interface Industry {
    // p_trans_date?: string,
    // window_end_time?: string,
    // index_code?: string,
    // index_name?: string,
    // window_start_time?: string,
    // send_time?: string,
    // attention_rate?: number,
    // mkt_code_quo?: number
    code: string,
    name: string,
    time: string,
    value: number,
    rank?: number,
};

export type { Industry };
// export { Industry };