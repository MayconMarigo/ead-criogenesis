import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  courses() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'courses', formData);
  }
  home() {
    const formData: FormData = new FormData();
    return this.http.post(environment.apiUrl + 'home', formData);
  }
  course(id: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'course/' + id, formData);
  }
  courseReview(courseId: string, score: string, type: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('course', courseId);
    formData.append('score', score);
    formData.append('type', type);
    return this.http.post(environment.apiUrl + 'course/review', formData);
  }
  courseView(content: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('content', content);
    return this.http.post(environment.apiUrl + 'course/view', formData);
  }
  courseUnview(content: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('content', content);
    return this.http.post(environment.apiUrl + 'course/unview', formData);
  }
  courseTest(id: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'course/test/' + id, formData);
  }
  courseTestAdmin(id: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/course/contents/test/' + id,
      formData
    );
  }
  courseTestStart(id: string, course: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('course', course);
    return this.http.post(
      environment.apiUrl + 'course/test/start/' + id,
      formData
    );
  }
  courseTestEnd(id: string, answer: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('answer', JSON.stringify(answer));

    return this.http.post(
      environment.apiUrl + 'course/test/end/' + id,
      formData
    );
  }
  coursesAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/courses', formData);
  }
  courseAdmin(courseId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/course/' + courseId,
      formData
    );
  }
  courseAddAdmin(data: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl + 'admin/course/add', formData);
  }
  courseRemoveAdmin(courseId: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/course/remove/' + courseId,
      formData
    );
  }
  courseSetAdmin(data: any, courserId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    return this.http.post(
      environment.apiUrl + 'admin/course/set/' + courserId,
      formData
    );
  }
  courseImageAdmin(file: any, courserId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('file', file);
    return this.http.post(
      environment.apiUrl + 'admin/course/image/' + courserId,
      formData
    );
  }
  courseInstructorAddAdmin(file: any, data: any, courseId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('file', file);
    formData.append('course', courseId);
    formData.append('name', data.name);
    formData.append('occupation', data.occupation);
    return this.http.post(
      environment.apiUrl + 'admin/course/instructor/add',
      formData
    );
  }
  courseInstructorRemoveAdmin(courserId: string, arrayIndex: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('course', courserId);
    formData.append('id', arrayIndex); // index do array
    return this.http.post(
      environment.apiUrl + 'admin/course/instructor/remove',
      formData
    );
  }
  courseContentsAdmin(courserId: string, data: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('course', courserId);
    formData.append('data', JSON.stringify(data));
    return this.http.post(
      environment.apiUrl + 'admin/course/contents',
      formData
    );
  }
  courseContentsFileAdmin(file: any, contentId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('file', file);
    return this.http.post(
      environment.apiUrl + 'admin/course/contents/file/' + contentId,
      formData
    );
  }
  courseContentsTestAdmin(data: any, contentId: string, course: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    formData.append('course', JSON.stringify(course));
    return this.http.post(
      environment.apiUrl + 'admin/course/contents/test/' + contentId,
      formData
    );
  }
  allCoursesAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/coursesAdmin', formData);
  }

  setOngoingCoursesOnRegister(email: string, courses: any) {
    const formData: FormData = new FormData();
    formData.append('email', JSON.stringify(email));
    formData.append('courses', JSON.stringify(courses));

    return this.http.post(
      environment.apiUrl + 'registerUserOnCourses',
      formData
    );
  }
}
