from pathlib import Path

from .utils import titleize


COURSE_HINTS = {
    "DSA": {"dsa", "two pointer", "linked list", "tree", "graph", "heap", "stack", "dynamic programming", "binary search", "array"},
    "System Design": {"system design", "scale", "estimation", "database", "load balancer", "cache", "millions"},
    "Machine Learning": {"machine learning", "recommendation", "prediction", "ranking", "model", "feature"},
    "OOD": {"ood", "object oriented", "parking", "vending", "atm", "black jack", "locker"},
    "Aptitude": {"aptitude", "reasoning", "quant", "verbal"},
    "OS": {"operating system", "process", "thread", "memory management", "deadlock"},
    "DBMS": {"dbms", "sql", "transaction", "normalization", "index"},
}


def classify(path: Path, title: str, text: str) -> tuple[str, str, str]:
    path_course = infer_course_from_path(path)
    if path_course != "OOD":
        course = path_course
        topic = infer_topic_from_path(path, course)
        return course, topic, titleize(path.stem, title)
    if looks_like_ood(path, title):
        return "OOD", infer_topic_from_path(path, "OOD"), titleize(path.stem, title)

    haystack = f"{path.as_posix()} {title} {text[:3000]}".lower()
    scored = []
    for course, hints in COURSE_HINTS.items():
        score = sum(1 for hint in hints if hint in haystack)
        if course.lower().replace(" ", "") in haystack.replace(" ", ""):
            score += 3
        scored.append((score, course))
    scored.sort(reverse=True)
    course = scored[0][1] if scored[0][0] > 0 else path_course
    topic = infer_topic_from_path(path, course)
    subtopic = titleize(path.stem, title)
    return course, topic, subtopic


def infer_course_from_path(path: Path) -> str:
    parts = [part.lower() for part in path.parts]
    if "dsa" in parts:
        return "DSA"
    if "systemdesigninterview" in parts:
        return "System Design"
    if "machinelearning" in parts:
        return "Machine Learning"
    return "OOD"


def infer_topic_from_path(path: Path, course: str) -> str:
    parent = path.parent.name
    if parent and parent not in {".", ""} and parent.lower() not in {"raw_material", "ood-design-principles"}:
        return titleize(parent, course)
    return course


def looks_like_ood(path: Path, title: str) -> bool:
    haystack = f"{path.name} {title}".lower()
    return any(
        hint in haystack
        for hint in [
            "ood",
            "object",
            "parking",
            "vending",
            "atm",
            "black",
            "jack",
            "locker",
            "movie",
            "grocery",
            "restaurant",
            "restraunt",
            "shipping",
            "tic",
            "toe",
            "unix",
        ]
    )
