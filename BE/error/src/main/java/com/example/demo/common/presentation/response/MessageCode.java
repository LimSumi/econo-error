package com.example.demo.common.presentation.response;

public enum MessageCode {
    CREATE("201", "생성 성공"), //201 멀까
    GET("200", "일정 조회 성공"),
    GETALL("200", "전체 일정 조회 성공"),
    GETYEAR("200", "년별 조회 성공"),
    GETMONTH("200", "월별 조회 성공"),
    GETWEEK("200", "주별 조회 성공"),
    UPDATE("200", "수정 성공"),
    DELETE("200", "삭제 성공");
    private final String code;
    private final String message;

    MessageCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
