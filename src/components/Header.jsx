const Header = ({ text, bg, count }) => {
    return (
        <div  className="header-container" style={{backgroundColor: `${bg}`}}>
            {text}
            <div className="header-count">{count}</div>
        </div>
    )
}
export default Header;