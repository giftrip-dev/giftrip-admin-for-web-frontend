#!/usr/bin/env python3
"""
Giftrip 웹 관리자 정보 구조 계층도 생성 스크립트
"""
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, ConnectionPatch
import matplotlib.font_manager as fm

# 한글 폰트 설정
plt.rcParams['font.family'] = 'AppleGothic'  # macOS
plt.rcParams['axes.unicode_minus'] = False

# 정보 구조 데이터
ia_structure = {
    "홈 (/)": {
        "type": "root",
        "children": {
            "로그인": {
                "path": "/login",
                "children": {}
            },
            "상품 관리": {
                "path": "/product-management",
                "children": {
                    "체험 상품": {
                        "path": "/product-management/experience",
                        "children": {
                            "상품 목록": {},
                            "상품 상세": {"path": "/experience/[id]"},
                            "상품 생성": {"path": "/experience/new"},
                            "상품 수정": {"path": "/experience/[id]/edit"}
                        }
                    },
                    "체험단 상품": {
                        "path": "/product-management/campaign",
                        "children": {
                            "상품 목록": {},
                            "상품 상세": {"path": "/campaign/[id]"},
                            "상품 생성": {"path": "/campaign/new"},
                            "상품 수정": {"path": "/campaign/[id]/edit"}
                        }
                    },
                    "숙소 상품": {
                        "path": "/product-management/accommodation",
                        "children": {
                            "상품 목록": {},
                            "상품 상세": {"path": "/accommodation/[id]"},
                            "상품 생성": {"path": "/accommodation/new"},
                            "상품 수정": {"path": "/accommodation/[id]/edit"},
                            "업체 관리": {"path": "/accommodation/company/new"}
                        }
                    },
                    "쇼핑 상품": {
                        "path": "/product-management/product",
                        "children": {
                            "상품 목록": {},
                            "상품 상세": {"path": "/product/[id]"},
                            "상품 생성": {"path": "/product/new"},
                            "상품 수정": {"path": "/product/[id]/edit"}
                        }
                    }
                }
            },
            "예약 관리": {
                "path": "/reservation",
                "children": {
                    "체험 예약": {
                        "path": "/reservation/experience",
                        "children": {
                            "예약 목록": {},
                            "예약 상세": {"path": "/reservation/experience/[id]"}
                        }
                    },
                    "체험단 예약": {
                        "path": "/reservation/campaign",
                        "children": {
                            "예약 목록": {},
                            "예약 상세": {"path": "/reservation/campaign/[id]"}
                        }
                    },
                    "숙소 예약": {
                        "path": "/reservation/accommodation",
                        "children": {
                            "예약 목록": {},
                            "예약 상세": {"path": "/reservation/accommodation/[id]"}
                        }
                    }
                }
            },
            "주문 관리": {
                "path": "/order/product",
                "children": {
                    "주문 목록": {},
                    "주문 상세": {"path": "/order/product/[id]"}
                }
            },
            "회원 관리": {
                "path": "/member",
                "children": {
                    "회원 목록": {},
                    "회원 상세": {"path": "/member/[id]"}
                }
            },
            "배너 관리": {
                "path": "/banner",
                "children": {
                    "메인 배너": {
                        "path": "/banner/main",
                        "children": {
                            "배너 목록": {},
                            "배너 상세": {"path": "/banner/main/[id]"},
                            "배너 생성": {"path": "/banner/main/new"},
                            "배너 수정": {"path": "/banner/main/[id]/edit"}
                        }
                    },
                    "서브 배너": {
                        "path": "/banner/sub",
                        "children": {
                            "배너 목록": {},
                            "배너 상세": {"path": "/banner/sub/[id]"},
                            "배너 생성": {"path": "/banner/sub/new"},
                            "배너 수정": {"path": "/banner/sub/[id]/edit"}
                        }
                    }
                }
            },
            "게시판 관리": {
                "path": "/notice",
                "children": {
                    "공지 목록": {},
                    "공지 상세": {"path": "/notice/[id]"},
                    "공지 생성": {"path": "/notice/new"},
                    "공지 수정": {"path": "/notice/[id]/edit"}
                }
            },
            "쿠폰 관리": {
                "path": "/coupon",
                "children": {
                    "쿠폰 목록": {},
                    "쿠폰 상세": {"path": "/coupon/[id]"},
                    "쿠폰 생성": {"path": "/coupon/new"},
                    "쿠폰 수정": {"path": "/coupon/[id]/edit"}
                }
            },
            "리뷰 관리": {
                "path": "/review",
                "children": {
                    "체험 리뷰": {"path": "/review/experience"},
                    "체험단 리뷰": {"path": "/review/campaign"},
                    "숙소 리뷰": {"path": "/review/accommodation"},
                    "상품 리뷰": {"path": "/review/product"},
                    "리뷰 상세": {"path": "/review/[id]"}
                }
            },
            "관리자 계정": {
                "path": "/account",
                "children": {
                    "계정 목록": {},
                    "계정 상세": {"path": "/account/[id]"},
                    "비밀번호 변경": {"path": "/account/password/reset"}
                }
            },
            "정책 관리": {
                "path": "/policy",
                "children": {
                    "서비스 이용약관": {"path": "/policy/service-terms"},
                    "개인정보 처리방침": {"path": "/policy/privacy"},
                    "환불 정책": {"path": "/policy/refund"}
                }
            }
        }
    }
}

def calculate_positions(node, level=0, x=0, y=0, positions=None, widths=None):
    """계층 구조를 기반으로 노드 위치 계산"""
    if positions is None:
        positions = {}
    if widths is None:
        widths = {}
    
    # 현재 노드의 너비 계산 (자식 수에 따라)
    if isinstance(node, dict) and "children" in node:
        children = node["children"]
        child_count = len(children)
    else:
        children = node if isinstance(node, dict) else {}
        child_count = len(children)
    
    # 노드 너비 저장
    widths[y] = max(widths.get(y, 0), child_count)
    
    # 현재 노드 위치 저장
    positions[(x, y)] = node
    
    # 자식 노드 위치 계산
    if child_count > 0:
        child_x = x - child_count / 2 + 0.5
        for i, (key, child) in enumerate(children.items()):
            child_y = y + 1
            child_x_pos = child_x + i
            calculate_positions(child, level + 1, child_x_pos, child_y, positions, widths)
    
    return positions, widths

def draw_node(ax, x, y, label, width=1.2, height=0.6, level=0):
    """노드 그리기"""
    # 레벨에 따른 색상
    colors = {
        0: '#FF6B6B',  # 루트 - 빨간색
        1: '#4ECDC4',  # 1단계 - 청록색
        2: '#45B7D1',  # 2단계 - 파란색
        3: '#96CEB4',  # 3단계 - 연두색
        4: '#FFEAA7',  # 4단계 - 노란색
    }
    color = colors.get(level, '#D3D3D3')
    
    # 박스 그리기
    box = FancyBboxPatch(
        (x - width/2, y - height/2),
        width, height,
        boxstyle="round,pad=0.1",
        linewidth=1.5,
        edgecolor='#333',
        facecolor=color,
        zorder=2
    )
    ax.add_patch(box)
    
    # 텍스트 추가 (경로 정보가 있으면 작은 폰트로)
    lines = label.split('\n')
    if len(lines) > 1 and '(' in lines[-1]:
        # 메인 레이블과 경로 정보 분리
        main_label = '\n'.join(lines[:-1])
        path_info = lines[-1]
        ax.text(x, y + 0.15, main_label, ha='center', va='center', 
                fontsize=11 - level * 0.5, weight='bold' if level <= 1 else 'normal',
                zorder=3)
        ax.text(x, y - 0.15, path_info, ha='center', va='center', 
                fontsize=8, style='italic', color='#555',
                zorder=3)
    else:
        ax.text(x, y, label, ha='center', va='center', 
                fontsize=11 - level * 0.5, weight='bold' if level <= 1 else 'normal',
                zorder=3)

def create_simplified_diagram(tree, positions):
    """간소화된 정보 구조 계층도 생성 (1-2단계만)"""
    fig, ax = plt.subplots(figsize=(20, 12))
    ax.set_xlim(-12, 12)
    ax.set_ylim(-1, 8)
    ax.axis('off')
    
    # 1단계와 2단계만 표시
    simplified_positions = {}
    for name, node_data in tree.items():
        if node_data["level"] <= 2:
            orig_pos = positions[name]
            # Y축 축소
            simplified_positions[name] = (orig_pos[0], orig_pos[1] * 0.4)
    
    # 연결선 그리기
    for name, node_data in tree.items():
        if node_data["level"] <= 2 and node_data["parent"]:
            if node_data["parent"] in simplified_positions:
                parent_pos = simplified_positions[node_data["parent"]]
                child_pos = simplified_positions[name]
                draw_connection(ax, parent_pos[0], parent_pos[1] + 0.3, 
                              child_pos[0], child_pos[1] - 0.3)
    
    # 노드 그리기
    for name, node_data in tree.items():
        if node_data["level"] <= 2:
            x, y = simplified_positions[name]
            label = node_data["name"]
            draw_node(ax, x, y, label, width=1.8, height=0.7, level=node_data["level"])
    
    fig.suptitle('Giftrip 웹 관리자 - 정보 구조 계층도 (간소화 버전)', 
                 fontsize=22, weight='bold', y=0.98)
    
    plt.tight_layout()
    plt.savefig('information-architecture-diagram-simplified.png', dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    print("✅ 간소화된 정보 구조 계층도가 'information-architecture-diagram-simplified.png' 파일로 생성되었습니다!")
    plt.close()

def draw_connection(ax, x1, y1, x2, y2):
    """연결선 그리기"""
    arrow = ConnectionPatch(
        (x1, y1), (x2, y2),
        "data", "data",
        arrowstyle="->", shrinkA=5, shrinkB=5,
        mutation_scale=20, fc='#666', ec='#666',
        linewidth=1.5, zorder=1
    )
    ax.add_patch(arrow)

def build_tree_dict(node_dict, parent_name="", level=0):
    """트리 구조를 평면 딕셔너리로 변환"""
    tree = {}
    
    for key, value in node_dict.items():
        current_name = f"{parent_name}/{key}" if parent_name else key
        tree[current_name] = {
            "name": key,
            "level": level,
            "path": value.get("path", "") if isinstance(value, dict) else "",
            "parent": parent_name if parent_name else None,
            "children": []
        }
        
        if isinstance(value, dict) and "children" in value:
            children = value["children"]
        elif isinstance(value, dict):
            children = value
        else:
            children = {}
        
        for child_key in children.keys():
            child_name = f"{current_name}/{child_key}"
            tree[current_name]["children"].append(child_name)
            tree.update(build_tree_dict({child_key: children[child_key]}, current_name, level + 1))
    
    return tree

def create_ia_diagram():
    """정보 구조 계층도 생성"""
    fig, ax = plt.subplots(figsize=(28, 36))
    ax.set_xlim(-18, 18)
    ax.set_ylim(-1, 20)
    ax.axis('off')
    
    # 트리 구조 생성
    tree = build_tree_dict(ia_structure)
    
    # 레벨별로 노드 그룹화
    levels = {}
    for name, node_data in tree.items():
        level = node_data["level"]
        if level not in levels:
            levels[level] = []
        levels[level].append((name, node_data))
    
    # 각 레벨의 위치 계산
    positions = {}
    y_offset = 0
    for level in sorted(levels.keys()):
        nodes = levels[level]
        node_count = len(nodes)
        
        # 레벨별 간격 계산
        if level == 0:
            x_positions = [0]
        elif level == 1:
            # 1단계는 넓게 분산
            spacing = 16 / max(1, node_count - 1) if node_count > 1 else 0
            x_positions = [-8 + i * spacing for i in range(node_count)]
        else:
            # 2단계 이상은 부모 노드 주변에 배치
            spacing = 3.5 / max(1, node_count - 1) if node_count > 1 else 0
            x_positions = [-1.75 + i * spacing for i in range(node_count)]
        
        for i, (name, node_data) in enumerate(nodes):
            if level > 1 and node_data["parent"]:
                # 부모 노드의 x 위치를 기준으로 조정
                parent_pos = positions.get(node_data["parent"], (0, 0))
                base_x = parent_pos[0]
                spacing = 2.5 / max(1, node_count - 1) if node_count > 1 else 0
                x = base_x - (node_count - 1) * spacing / 2 + i * spacing
            else:
                x = x_positions[i] if i < len(x_positions) else 0
            positions[name] = (x, y_offset)
        
        y_offset += 2.2 if level == 0 else (2.0 if level == 1 else 1.8)
    
    # 연결선 그리기
    for name, node_data in tree.items():
        if node_data["parent"]:
            parent_pos = positions[node_data["parent"]]
            child_pos = positions[name]
            draw_connection(ax, parent_pos[0], parent_pos[1] + 0.35, 
                          child_pos[0], child_pos[1] - 0.35)
    
    # 노드 그리기
    for name, node_data in tree.items():
        x, y = positions[name]
        label = node_data["name"]
        # 레이블이 길면 줄바꿈
        if len(label) > 12:
            # 한글 기준으로 줄바꿈
            mid = len(label) // 2
            label = label[:mid] + '\n' + label[mid:]
        
        # 경로 정보 추가
        if node_data["path"]:
            label_with_path = f"{label}\n({node_data['path']})"
        else:
            label_with_path = label
            
        draw_node(ax, x, y, label_with_path, width=2.0, height=0.9, level=node_data["level"])
    
    # 제목 추가
    fig.suptitle('Giftrip 웹 관리자 - 정보 구조 계층도 (Information Architecture)', 
                 fontsize=26, weight='bold', y=0.99)
    
    # 범례 추가
    legend_elements = [
        mpatches.Patch(facecolor='#FF6B6B', label='루트 (홈)'),
        mpatches.Patch(facecolor='#4ECDC4', label='1단계 메뉴 (메인 카테고리)'),
        mpatches.Patch(facecolor='#45B7D1', label='2단계 메뉴 (서브 카테고리)'),
        mpatches.Patch(facecolor='#96CEB4', label='3단계 메뉴 (페이지)'),
        mpatches.Patch(facecolor='#FFEAA7', label='4단계 메뉴 (상세 페이지)'),
    ]
    ax.legend(handles=legend_elements, loc='upper right', fontsize=11, framealpha=0.9)
    
    plt.tight_layout()
    plt.savefig('information-architecture-diagram.png', dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    print("✅ 정보 구조 계층도가 'information-architecture-diagram.png' 파일로 생성되었습니다!")
    
    # 간소화된 버전도 생성
    create_simplified_diagram(tree, positions)
    plt.close()

if __name__ == "__main__":
    create_ia_diagram()

