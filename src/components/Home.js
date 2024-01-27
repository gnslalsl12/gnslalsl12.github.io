import React, { useContext, useEffect, useRef } from "react";
import HomeInfos from "./HomeInfos";

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const makeDots = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particlesArray = [];
      const numberOfParticles = 60;

      const mouse = {
        x: 1000,
        y: 1000,
        radius: 50,
      };

      window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });

      // 중심점 구하기
      const centerX = canvas.width / 3;
      const centerY = canvas.height * (3 / 4);

      class Particle {
        constructor(index) {
          // 각도와 반경으로 위치 설정
          this.angle = Math.random() * Math.PI * 2;
          this.lineLength = 1500;
          this.radius = Math.random() * 700 + 1;
          this.x = centerX + this.radius * Math.cos(this.angle);
          this.y = centerY + this.radius * Math.sin(this.angle);
          // this.size = Math.random() * 2 + 0.2; // 최소 크기 0.2을 보장
          this.size = 1.2;
          this.speed = Math.random() * 0.001 + 0.001; // 속도 설정
          this.opacity = 0.25;
          this.targetOpacity = 0.25;
          if (index < numberOfParticles / 2) {
            this.rgb = "217, 169, 26";
            // } else if (index < (numberOfParticles * 2) / 3) {
            //   this.rgb = "28,54,89";
          } else {
            this.rgb = "126, 173, 191";
          }
        }

        // 위치 업데이트 함수
        update() {
          this.angle += this.speed;
          this.x = centerX + this.radius * Math.cos(this.angle);
          this.y = centerY + this.radius * Math.sin(this.angle);

          // 마우스 주변에 있을 때 목표 투명도 변경
          // const distance = Math.sqrt(dx * dx + dy * dy);
          // 선분의 끝점 (수정된 끝점 좌표)
          const endX = this.x - this.lineLength;
          const endY = this.y - this.lineLength * 0.5;

          // 마우스와 선 사이의 거리 계산
          const distanceToLine = this.distanceToLine(mouse.x, mouse.y, this.x, this.y, endX, endY);
          this.targetOpacity = distanceToLine < mouse.radius ? 0.8 : 0.2;

          // 현재 투명도를 목표 투명도에 점진적으로 가깝게 변경
          if (this.opacity < this.targetOpacity) {
            this.opacity += 0.015; // 투명도 서서히 증가
          } else if (this.opacity > this.targetOpacity) {
            this.opacity -= 0.015; // 투명도 서서히 감소
          }

          // 투명도 값을 범위 내로 제한
          this.opacity = Math.min(Math.max(this.opacity, 0.2), 0.8);
        }

        // 점 (px, py)와 선분 (x1, y1) - (x2, y2) 사이의 최소 거리 계산
        distanceToLine(px, py, x1, y1, x2, y2) {
          const A = px - x1;
          const B = py - y1;
          const C = x2 - x1;
          const D = y2 - y1;

          const dot = A * C + B * D;
          const len_sq = C * C + D * D;
          const param = len_sq !== 0 ? dot / len_sq : -1;

          let xx, yy;

          if (param < 0) {
            xx = x1;
            yy = y1;
          } else if (param > 1) {
            xx = x2;
            yy = y2;
          } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
          }

          const dx = px - xx;
          const dy = py - yy;
          return Math.sqrt(dx * dx + dy * dy);
        }

        // 점 그리기 함수
        draw() {
          context.fillStyle = `rgba(${this.rgb})`;
          context.strokeStyle = `rgba(246, 246, 246, ${this.opacity})`;
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fill();

          // 아래로 뻗어나가는 선 그리기
          context.moveTo(this.x, this.y);
          context.lineTo(this.x - this.lineLength, this.y - this.lineLength * 1);
          context.stroke();
        }
      }

      // 초기 파티클 생성
      function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle(i));
        }
      }

      // 파티클들을 다루는 함수
      function handleParticles() {
        for (let particle of particlesArray) {
          particle.draw();
          particle.update();
        }
      }

      // 애니메이션 함수
      function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
      }

      init();
      animate();

      // 이벤트 리스너 제거
      return () => {
        window.removeEventListener("mousemove", (event) => {
          mouse.x = event.x;
          mouse.y = event.y;
        });
      };
    };
    makeDots();
  }, []);

  return (
    <div className="page_home">
      <canvas id="canvas" ref={canvasRef} className="home_canvas" />
      <HomeInfos />
    </div>
  );
};

export default Home;
